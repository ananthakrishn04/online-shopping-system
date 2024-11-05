from flask import Flask, request, jsonify
from flask_cors import CORS
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)

orders = {}

@app.route('/api/payment', methods=['POST'])
def process_payment():
    data = request.json
    
    required_fields = ['amount', 'cardNumber', 'expiryMonth', 'expiryYear', 'cvc']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    card_number = data['cardNumber'].replace(' ', '')
    if not (card_number.isdigit() and len(card_number) == 16):
        return jsonify({'error': 'Invalid card number'}), 400
    
    success = card_number.endswith('4242')
    
    if success:
        order_id = str(uuid.uuid4())
        orders[order_id] = {
            'id': order_id,
            'amount': data['amount'],
            'status': 'completed',
            'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }

        return jsonify({
            'success': True,
            'order_id': order_id,
            'message': 'Payment processed successfully'
        })
    

    else:
        return jsonify({
            'success': False,
            'error': 'Payment failed. Please try again.'
        }), 400

@app.route('/api/orders/<order_id>', methods=['GET'])
def get_order(order_id):
    order = orders.get(order_id)
    if order:
        return jsonify(order)
    return jsonify({'error': 'Order not found'}), 404

if __name__ == '__main__':
    app.run(port=5000)