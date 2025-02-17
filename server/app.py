from flask import Flask
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")  # For development only

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('message', 'Connected')

@socketio.on('message')
def handle_message(data):
    print(f'Received message: {data}')
    emit('message', data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)