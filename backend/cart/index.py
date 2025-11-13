import json
import os
import psycopg2
import jwt
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage user cart (add, remove, update quantity, list)
    Args: event with httpMethod, headers (X-Auth-Token), body (product_id, size, quantity)
    Returns: HTTP response with cart items or success message
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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
                "SELECT id, product_id, size, quantity FROM cart WHERE user_id = %s",
                (user_id,)
            )
            cart_items = [
                {'id': row[0], 'product_id': row[1], 'size': row[2], 'quantity': row[3]}
                for row in cur.fetchall()
            ]
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'cart': cart_items})
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            product_id = body_data.get('product_id')
            size = body_data.get('size', '')
            quantity = body_data.get('quantity', 1)
            
            if not product_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'product_id обязателен'})
                }
            
            cur.execute(
                """INSERT INTO cart (user_id, product_id, size, quantity) 
                   VALUES (%s, %s, %s, %s)
                   ON CONFLICT (user_id, product_id, size) 
                   DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity""",
                (user_id, product_id, size, quantity)
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Добавлено в корзину'})
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            cart_id = body_data.get('cart_id')
            quantity = body_data.get('quantity')
            
            if not cart_id or quantity is None:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'cart_id и quantity обязательны'})
                }
            
            if quantity <= 0:
                cur.execute(
                    "DELETE FROM cart WHERE id = %s AND user_id = %s",
                    (cart_id, user_id)
                )
            else:
                cur.execute(
                    "UPDATE cart SET quantity = %s WHERE id = %s AND user_id = %s",
                    (quantity, cart_id, user_id)
                )
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Корзина обновлена'})
            }
        
        elif method == 'DELETE':
            query_params = event.get('queryStringParameters', {})
            cart_id = query_params.get('cart_id')
            
            if not cart_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'cart_id обязателен'})
                }
            
            cur.execute(
                "DELETE FROM cart WHERE id = %s AND user_id = %s",
                (int(cart_id), user_id)
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'message': 'Удалено из корзины'})
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
