from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)

# Store messages in memory for simplicity
messages = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.json
    sender = data.get('sender')
    message = data.get('message')
    timestamp = datetime.now().strftime("%H:%M:%S")
    
    if sender and message:
        messages.append({'sender': sender, 'message': message, 'timestamp': timestamp})
        return jsonify({'status': 'success'}), 200
    return jsonify({'status': 'error'}), 400

@app.route('/get_messages', methods=['GET'])
def get_messages():
    return jsonify(messages), 200

if __name__ == '__main__':
    app.run(debug=True)
