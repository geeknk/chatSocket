// frontend/src/components/Chat.jsx
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Message from './Message';

const socket = io('http://localhost:4000');

const Chat = ({ selectedContact }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {

        // Fetch current user from backend
        const fetchCurrentUser = async () => {
            const response = await fetch('http://localhost:4000/api/currentUser');
            const user = await response.json();
            setCurrentUser(user);
        };

        fetchCurrentUser();

        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    const sendMessage = async () => {
        if (input) {
            const message = { text: input, sender: currentUser.name, receiver: selectedContact };

            // Emit the message to the server
            socket.emit('sendMessage', message);

            // Also save to the database
            await fetch('http://localhost:4000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            });

            setInput('');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">{`Chat with ${selectedContact}`}</div>
            <div className="messages">
                {messages.map((msg, index) => (
                    <Message key={index} message={msg.text} isUser={msg.sender === 'Me'} />
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
