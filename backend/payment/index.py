import json
import os
import uuid
import base64
import urllib.request
import urllib.error
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Create payment via YooKassa API
    Args: event with httpMethod, body (amount, description, return_url)
    Returns: HTTP response with payment URL or error
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    amount = body_data.get('amount')
    description = body_data.get('description', 'Заказ в RONDO GRANDE')
    return_url = body_data.get('return_url', 'https://rondogrande.com')
    
    if not amount:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Amount is required'}),
            'isBase64Encoded': False
        }
    
    shop_id = os.environ.get('YOOKASSA_SHOP_ID')
    secret_key = os.environ.get('YOOKASSA_SECRET_KEY')
    
    if not shop_id or not secret_key:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Payment credentials not configured'}),
            'isBase64Encoded': False
        }
    
    idempotence_key = str(uuid.uuid4())
    
    payment_data = {
        'amount': {
            'value': str(amount),
            'currency': 'RUB'
        },
        'confirmation': {
            'type': 'redirect',
            'return_url': return_url
        },
        'capture': True,
        'description': description
    }
    
    credentials = f"{shop_id}:{secret_key}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()
    
    headers = {
        'Content-Type': 'application/json',
        'Idempotence-Key': idempotence_key,
        'Authorization': f'Basic {encoded_credentials}'
    }
    
    req = urllib.request.Request(
        'https://api.yookassa.ru/v3/payments',
        data=json.dumps(payment_data).encode(),
        headers=headers,
        method='POST'
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode())
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'payment_id': result['id'],
                    'payment_url': result['confirmation']['confirmation_url'],
                    'status': result['status']
                }),
                'isBase64Encoded': False
            }
    except urllib.error.HTTPError as e:
        error_body = e.read().decode()
        return {
            'statusCode': e.code,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': error_body}),
            'isBase64Encoded': False
        }
