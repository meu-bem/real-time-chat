import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://172.31.128.104:5000'); // Connect to the Flask backend

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (data) => {
      setMessages((prev) => [...prev, data]); // Assume `data` is a string
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('message', message); // Send the message to the server
      setMessage('');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Realtime Chat</h1>
      <div style={{ marginBottom: '20px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ padding: '5px', borderBottom: '1px solid #ccc' }}>
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: '10px', width: '300px', marginRight: '10px' }}
          placeholder="Type a message..."
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default App;