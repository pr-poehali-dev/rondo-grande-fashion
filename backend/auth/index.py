import json
import os
import psycopg2
from typing import Dict, Any
import hashlib
import jwt
from datetime import datetime, timedelta

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: User registration and login
    Args: event with httpMethod, body (email, password, name)
    Returns: HTTP response with JWT token or error
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    action = body_data.get('action')
    email = body_data.get('email', '').strip().lower()
    password = body_data.get('password', '')
    
    if not email or not password:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email и пароль обязательны'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    jwt_secret = str(os.environ.get('JWT_SECRET', 'temp-secret'))
    
    if not jwt_secret or jwt_secret == 'temp-secret':
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'JWT_SECRET не настроен'})
        }
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor()
    
    try:
        if action == 'register':
            name = body_data.get('name', '')
            password_hash = hashlib.sha256(password.encode()).hexdigest()
            
            cur.execute("SELECT id FROM users WHERE email = %s", (email,))
            if cur.fetchone():
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Пользователь с таким email уже существует'})
                }
            
            cur.execute(
                "INSERT INTO users (email, password_hash, name) VALUES (%s, %s, %s) RETURNING id",
                (email, password_hash, name)
            )
            user_id = cur.fetchone()[0]
            conn.commit()
            
            token = jwt.encode(
                {'user_id': user_id, 'email': email, 'exp': datetime.utcnow() + timedelta(days=30)},
                jwt_secret,
                algorithm='HS256'
            )
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'token': token, 'user': {'id': user_id, 'email': email, 'name': name}})
            }
        
        elif action == 'login':
            password_hash = hashlib.sha256(password.encode()).hexdigest()
            
            cur.execute(
                "SELECT id, email, name FROM users WHERE email = %s AND password_hash = %s",
                (email, password_hash)
            )
            user = cur.fetchone()
            
            if not user:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверный email или пароль'})
                }
            
            user_id, user_email, user_name = user
            token = jwt.encode(
                {'user_id': user_id, 'email': user_email, 'exp': datetime.utcnow() + timedelta(days=30)},
                jwt_secret,
                algorithm='HS256'
            )
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'token': token, 'user': {'id': user_id, 'email': user_email, 'name': user_name}})
            }
        
        else:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неверное действие'})
            }
    
    finally:
        cur.close()
        conn.close()