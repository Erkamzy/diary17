from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from datetime import datetime
from backendd.settings import sendResponse, connectDB, disconnectDB

def dt_time(request): #{key : value, key1 : value1, key2 : value2, }
    jsons = json.loads(request.body)
    action = jsons['action']
    respData = [{"tsag":str(datetime.now())}] # response-n data-g beldej baina. data key ni list baih buguud list dotor dictionary baina.
    resp = sendResponse(action, 200, "Success", respData)
    return (resp) # response bustsaaj baina

def add_memory(request):
    jsons = json.loads(request.body)
    action = jsons['action']

    try:
        title = jsons['title']
        content = jsons['content']
        created_at = datetime.now()
    except KeyError:
        return sendResponse(action, 400, "title болон content шаардлагатай", [])

    try:
        myConn = connectDB()
        cursor = myConn.cursor()

        query = f"""INSERT INTO t_memory (title, content, created_at) VALUES (%s, %s, %s) RETURNING mid"""
        cursor.execute(query, (title, content, created_at))
        mid = cursor.fetchone()[0]
        myConn.commit()

        return sendResponse(action, 200, "Дурсамж амжилттай нэмэгдлээ", {"mid": mid})
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

        query = """SELECT mid, title, content, created_at FROM t_memory ORDER BY created_at DESC"""
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