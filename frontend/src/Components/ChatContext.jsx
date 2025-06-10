import { createContext, useState } from 'react';

export const ChatContext = createContext(null);

export function ChatProvider({ children }) {
    const [chatHistory, setChatHistory] = useState([]);
    const [activeChat, setActiveChat] = useState(null);

    return (
        <ChatContext.Provider value={{ chatHistory, setChatHistory, activeChat, setActiveChat }}>
            {children}
        </ChatContext.Provider>
    );
}