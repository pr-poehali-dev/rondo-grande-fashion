import json
import os
import psycopg2
import jwt
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get and update user profile
    Args: event with httpMethod, headers (X-Auth-Token), body (address, delivery_type, payment_type)
    Returns: HTTP response with user profile data or success message
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    headers = event.get('headers', {})
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token')
    
    if not token:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Требуется авторизация'})
        }
    
    jwt_secret = str(os.environ.get('JWT_SECRET', 'temp-secret'))
    
    try:
        payload = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        user_id = payload['user_id']
    except jwt.ExpiredSignatureError:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Токен истёк'})
        }
    except jwt.InvalidTokenError:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Неверный токен'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            cur.execute(
                "SELECT id, email, name, phone, address, delivery_type, payment_type FROM users WHERE id = %s",
                (user_id,)
            )
            user = cur.fetchone()
            
            if not user:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Пользователь не найден'})
                }
            
            user_data = {
                'id': user[0],
                'email': user[1],
                'name': user[2],
                'phone': user[3],
                'address': user[4],
                'delivery_type': user[5],
                'payment_type': user[6]
            }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(user_data)
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            
            name = body_data.get('name')
            phone = body_data.get('phone')
            address = body_data.get('address')
            delivery_type = body_data.get('delivery_type')
            payment_type = body_data.get('payment_type')
            
            cur.execute(
                """UPDATE users 
                   SET name = COALESCE(%s, name),
                       phone = COALESCE(%s, phone),
                       address = COALESCE(%s, address),
                       delivery_type = COALESCE(%s, delivery_type),
                       payment_type = COALESCE(%s, payment_type)
                   WHERE id = %s
                   RETURNING id, email, name, phone, address, delivery_type, payment_type""",
                (name, phone, address, delivery_type, payment_type, user_id)
            )
            
            user = cur.fetchone()
            conn.commit()
            
            user_data = {
                'id': user[0],
                'email': user[1],
                'name': user[2],
                'phone': user[3],
                'address': user[4],
                'delivery_type': user[5],
                'payment_type': user[6]
            }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Профиль обновлён', 'user': user_data})
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'})
            }
    
    finally:
        cur.close()
        conn.close()
