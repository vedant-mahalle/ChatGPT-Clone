import { createContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export const ChatContext = createContext();

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export function ChatProvider({ children }) {
    const { user } = useUser();
    const [chatHistory, setChatHistory] = useState([]);
    const [activeChat, setActiveChat] = useState(null);

    // Fetch chats from backend when user logs in
    useEffect(() => {
        if (user && user.id) {
            fetch(`${BACKEND_URL}/api/chats?userId=${user.id}`)
                .then(res => res.json())
                .then(data => {
                    setChatHistory(data);
                    if (data.length > 0) setActiveChat(data[0].id);
                })
                .catch(err => console.error('Error fetching chats:', err));
        }
    }, [user]);

    // Save chat to backend
    const saveChatToBackend = async (chat) => {
        if (!user || !user.id) return;
        try {
            await fetch(`${BACKEND_URL}/api/chats`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    title: chat.title,
                    messages: chat.messages
                })
            });
        } catch (err) {
            console.error('Error saving chat:', err);
        }
    };

    return (
        <ChatContext.Provider value={{ chatHistory, setChatHistory, activeChat, setActiveChat, saveChatToBackend }}>
            {children}
        </ChatContext.Provider>
    );
}