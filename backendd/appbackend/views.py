from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime
from backendd.settings import sendResponse, connectDB, disconnectDB
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password

def dt_time(request): #{key : value, key1 : value1, key2 : value2, }
    jsons = json.loads(request.body)
    action = jsons['action']
    respData = [{"tsag":str(datetime.now())}] # response-n data-g beldej baina. data key ni list baih buguud list dotor dictionary baina.
    resp = sendResponse(action, 200, "Success", respData)
    return (resp) # response bustsaaj baina

def add_memory(request):
    jsons = json.loads(request.body)
    action = jsons.get('action')

    try:
        title = jsons['title']
        description = jsons['description']
        image_url = jsons.get('image_url', '')  # Заавал биш бол хоосон мөрөөр авах
        memory_date = jsons.get('memory_date')  # Та хүсвэл он / сар / өдөр илгээж болно
        user_id = jsons.get('user_id')  # Хэрэглэгчийн ID-г хүсэлтээс авна
        created_at = datetime.now()
    except KeyError:
        return sendResponse(action, 400, "title болон description шаардлагатай", [])

    # memory_date-д огноо ирээгүй бол None, эсвэл str -> datetime хөрвүүлэлт хийх боломжтой
    if memory_date:
        try:
            memory_date = datetime.strptime(memory_date, "%Y-%m-%d")
        except ValueError:
            return sendResponse(action, 400, "memory_date буруу форматтай байна. Жишээ: 2025-05-22", [])

    try:
        myConn = connectDB()
        cursor = myConn.cursor()

        query = """
            INSERT INTO public.memories 
                (title, description, image_url, memory_date, user_id, created_at)
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

def get_memory(request):
    jsons = json.loads(request.body)
    action = jsons['action']

    try:
        myConn = connectDB()
        cursor = myConn.cursor()

        query = """SELECT id, title, description, image_url, memory_date, user_id, created_at FROM public.memories;"""
        cursor.execute(query)
        columns = cursor.description
        respRow = [{columns[index][0]: column for index, column in enumerate(row)} for row in cursor.fetchall()]
        cursor.close()

        return sendResponse(action, 200, "Дурсамжуудыг илгээлээ", respRow)
    except Exception as e:
        return sendResponse(action, 500, str(e), [])
    finally:
        disconnectDB(myConn)

def edit_memory(request):
    jsons = json.loads(request.body)
    action = jsons['action']

    try:
        mid = jsons['mid']
        title = jsons['title']
        content = jsons['content']
    except KeyError:
        return sendResponse(action, 400, "mid, title, content шаардлагатай", [])

    try:
        myConn = connectDB()
        cursor = myConn.cursor()

        query = """UPDATE t_memory SET title = %s, content = %s WHERE mid = %s RETURNING mid"""
        cursor.execute(query, (title, content, mid))
        updated = cursor.fetchone()

        if updated is None:
            return sendResponse(action, 404, "Дурсамж олдсонгүй", [])

        myConn.commit()
        return sendResponse(action, 200, "Дурсамж амжилттай засагдлаа", [])
    except Exception as e:
        return sendResponse(action, 500, str(e), [])
    finally:
        disconnectDB(myConn)

def delete_memory(request):
    jsons = json.loads(request.body)
    action = jsons['action']

    try:
        mid = jsons['mid']
    except KeyError:
        return sendResponse(action, 400, "mid шаардлагатай", [])

    try:
        myConn = connectDB()
        cursor = myConn.cursor()

        query = """DELETE FROM t_memory WHERE mid = %s RETURNING mid"""
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
def add_user(request):
    conn = None  # ← conn-г default-оор None болгож үүсгэнэ

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
            VALUES (%s, %s, %s, NOW())
            RETURNING id, username, email
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
        if conn:
            disconnectDB(conn)

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