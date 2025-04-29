import React, { useEffect, useState, useRef } from 'react';

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const socket = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Connect to WebSocket server
        socket.current = new WebSocket('ws://localhost:8000/chat');  // <-- adjust if your server isn't localhost:8000

        socket.current.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        socket.current.onmessage = (event) => {
            console.log('Received message:', event.data);
            setMessages(prev => [...prev, event.data]);
        };

        socket.current.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            socket.current?.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket.current && inputValue.trim() !== '') {
            socket.current.send(inputValue);  // Send message to the WebSocket server
            setInputValue('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessage();  // Trigger sendMessage on Enter key
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1>Group Chat</h1>
            <div style={{ border: '1px solid gray', padding: '10px', height: '400px', overflowY: 'scroll' }}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={{ marginBottom: '5px' }}>
                        {msg}
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '10px', display: 'flex' }}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ flexGrow: 1, marginRight: '5px' }}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage;
