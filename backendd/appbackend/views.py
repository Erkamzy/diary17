from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime
from backendd.settings import sendResponse, connectDB, disconnectDB
from django.contrib.auth.hashers import make_password, check_password

@csrf_exempt
def dt_time(request):
    jsons = json.loads(request.body)
    action = jsons.get('action', 'time')
    respData = [{"tsag": str(datetime.now())}]
    return sendResponse(action, 200, "Success", respData)

@csrf_exempt
def add_memory(request):
    jsons = json.loads(request.body)
    action = jsons.get('action', 'add_memory')

    try:
        title = jsons['title']
        description = jsons['description']
        image_url = jsons.get('image_url', '')
        memory_date = jsons.get('memory_date')
        user_id = jsons['user_id']
        created_at = datetime.now()
    except KeyError:
        return sendResponse(action, 400, "title, description, user_id шаардлагатай", [])

    if memory_date:
        try:
            memory_date = datetime.strptime(memory_date, "%Y-%m-%d")
        except ValueError:
            return sendResponse(action, 400, "memory_date буруу форматтай байна. Жишээ: 2025-05-22", [])

    try:
        myConn = connectDB()
        cursor = myConn.cursor()
        query = """
            INSERT INTO public.memories (title, description, image_url, memory_date, user_id, created_at)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id
        """
        cursor.execute(query, (title, description, image_url, memory_date, user_id, created_at))
        inserted_id = cursor.fetchone()[0]
        myConn.commit()
        return sendResponse(action, 200, "Дурсамж амжилттай нэмэгдлээ", {"mid": inserted_id})
    except Exception as e:
        return sendResponse(action, 500, str(e), [])
    finally:
        disconnectDB(myConn)

@csrf_exempt
def get_memory(request):
    action = "get_memory"

    try:
        myConn = connectDB()
        cursor = myConn.cursor()
        query = """
            SELECT 
                m.id, m.title, m.description, m.image_url, m.memory_date, m.user_id, m.created_at,
                m.likes, m.comments, u.username as user_name, u.avatar as user_avatar
            FROM public.memories m
            INNER JOIN public.users u ON m.user_id = u.id
            ORDER BY m.created_at DESC
        """
        cursor.execute(query)
        columns = [col[0] for col in cursor.description]

        respRow = []
        for row in cursor.fetchall():
            row_dict = dict(zip(columns, row))

            memory = {
                "id": row_dict["id"],
                "title": row_dict["title"],
                "description": row_dict["description"],
                "imageUrl": row_dict["image_url"],
                "date": row_dict["memory_date"].strftime("%Y-%m-%d"),
                "author": {
                    "name": row_dict["user_name"],
                    "avatar": row_dict["user_avatar"] or "/default-avatar.png"
                },
                "likes": row_dict["likes"] or 0,
                "comments": row_dict["comments"] or 0,
                "userId": row_dict["user_id"]
            }
            respRow.append(memory)
            print(memory["imageUrl"])
        return sendResponse(action, 200, "Дурсамжуудыг илгээлээ", respRow)
    except Exception as e:
        return sendResponse(action, 500, f"Серверийн алдаа: {str(e)}", [])
    finally:
        disconnectDB(myConn)


def get_user_id_from_request(request):
    try:
        body = json.loads(request.body)
        return body.get('user_id')
    except Exception:
        return None

def get_my_memory(request):
    action = "get_memory"
    
    user_id = get_user_id_from_request(request)
    if not user_id:
        return sendResponse(action, 401, "Unauthorized: Хэрэглэгчийн ID олдсонгүй", [])

    try:
        myConn = connectDB()
        cursor = myConn.cursor()
        query = """
            SELECT 
                m.id, m.title, m.description, m.image_url, m.memory_date, m.user_id, m.created_at,
                m.likes, m.comments, u.username as user_name, u.avatar as user_avatar
            FROM public.memories m
            INNER JOIN public.users u ON m.user_id = u.id
            WHERE m.user_id = %s
            ORDER BY m.created_at DESC
        """
        cursor.execute(query, (user_id,))
        columns = [col[0] for col in cursor.description]

        respRow = []
        for row in cursor.fetchall():
            row_dict = dict(zip(columns, row))
            
            memory = {
                "id": row_dict["id"],
                "title": row_dict["title"],
                "description": row_dict["description"],
                "imageUrl": row_dict["image_url"],
                "date": row_dict["memory_date"].strftime("%Y-%m-%d"),  # эсвэл ISO формат
                "author": {
                    "name": row_dict["user_name"],
                    "avatar": row_dict["user_avatar"] or "/default-avatar.png"
                },
                "likes": 0,
                "comments": 0,
                "userId": row_dict["user_id"]
            }
            respRow.append(memory)

        return sendResponse(action, 200, "Таны дурсамжуудыг илгээлээ", respRow)
    except Exception as e:
        return sendResponse(action, 500, f"Серверийн алдаа: {str(e)}", [])
    finally:
        disconnectDB(myConn)


@csrf_exempt
def edit_memory(request):
    jsons = json.loads(request.body)
    action = jsons.get('action', 'edit_memory')

    try:
        mid = jsons['mid']
        title = jsons['title']
        description = jsons['description']
    except KeyError:
        return sendResponse(action, 400, "mid, title, description шаардлагатай", [])

    try:
        myConn = connectDB()
        cursor = myConn.cursor()
        query = """UPDATE public.memories SET title = %s, description = %s WHERE id = %s RETURNING id"""
        cursor.execute(query, (title, description, mid))
        updated = cursor.fetchone()

        if updated is None:
            return sendResponse(action, 404, "Дурсамж олдсонгүй", [])

        myConn.commit()
        return sendResponse(action, 200, "Дурсамж амжилттай засагдлаа", [])
    except Exception as e:
        return sendResponse(action, 500, str(e), [])
    finally:
        disconnectDB(myConn)

@csrf_exempt
def delete_memory(request):
    jsons = json.loads(request.body)
    action = jsons.get('action', 'delete_memory')

    try:
        mid = jsons['mid']
    except KeyError:
        return sendResponse(action, 400, "mid шаардлагатай", [])

    try:
        myConn = connectDB()
        cursor = myConn.cursor()
        query = "DELETE FROM public.memories WHERE id = %s RETURNING id"
        cursor.execute(query, (mid,))
        deleted = cursor.fetchone()

        if deleted is None:
            return sendResponse(action, 404, "Дурсамж олдсонгүй", [])

        myConn.commit()
        return sendResponse(action, 200, "Дурсамж амжилттай устгагдлаа", [])
    except Exception as e:
        return sendResponse(action, 500, str(e), [])
    finally:
        disconnectDB(myConn)

@csrf_exempt
def add_user(request):
    if request.method != "POST":
        return JsonResponse({"status": 405, "message": "POST method required"})

    try:
        data = json.loads(request.body)
        action = data.get("action", "add_user")
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not username or not email or not password:
            return sendResponse(action, 400, "username, email, password шаардлагатай", [])

        password_hash = make_password(password)
        conn = connectDB()
        cursor = conn.cursor()
        insert_query = """
            INSERT INTO users (username, email, password_hash, created_at)
            VALUES (%s, %s, %s, NOW()) RETURNING id, username, email
        """
        cursor.execute(insert_query, (username, email, password_hash))
        user = cursor.fetchone()
        conn.commit()
        return sendResponse(action, 201, "Хэрэглэгч амжилттай нэмэгдлээ", {
            "id": user[0],
            "username": user[1],
            "email": user[2]
        })

    except Exception as e:
        return sendResponse("add_user", 500, str(e), [])
    finally:
        if 'conn' in locals():
            disconnectDB(conn)

@csrf_exempt
def login_user(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST method allowed"}, status=405)

    try:
        jsons = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    action = jsons.get("action", "login_user")
    email = jsons.get("email")
    password = jsons.get("password")

    if not email or not password:
        return sendResponse(action, 400, "И-мэйл болон нууц үг шаардлагатай", [])

    try:
        conn = connectDB()
        cursor = conn.cursor()
        query = "SELECT id, username, email, password_hash FROM users WHERE email = %s"
        cursor.execute(query, (email,))
        row = cursor.fetchone()

        if row and check_password(password, row[3]):
            user_data = {
                "id": row[0],
                "username": row[1],
                "email": row[2],
            }
            return sendResponse(action, 200, "Амжилттай нэвтэрлээ", [user_data])
        else:
            return sendResponse(action, 401, "Имэйл эсвэл нууц үг буруу байна", [])
    except Exception as e:
        return sendResponse(action, 500, str(e), [])
    finally:
        if 'conn' in locals():
            disconnectDB(conn)

@csrf_exempt
def memoryService(request):
    if request.method == "POST":
        try:
            jsons = json.loads(request.body)
            action = jsons.get('action')
        except:
            return JsonResponse(sendResponse("invalid", 400, "Invalid JSON", []))

        if action == 'add_memory':
            return JsonResponse(add_memory(request))
        elif action == 'get_memory':
            return JsonResponse(get_memory(request))
        elif action == 'get_my_memory':
            return JsonResponse(get_my_memory(request))
        elif action == 'add_user':
            return JsonResponse(add_user(request))
        elif action == 'login':
            return JsonResponse(login_user(request))
        elif action == 'time':
            return JsonResponse(dt_time(request))
        elif action == 'edit_memory':
            return JsonResponse(edit_memory(request))
        elif action == 'delete_memory':
            return JsonResponse(delete_memory(request))
        else:
            return JsonResponse(sendResponse(action, 406, "Action олдсонгүй", []))
    elif request.method == "GET":
        return JsonResponse({"method": "GET"})
    else:
        return JsonResponse({"method": "Бусад"})