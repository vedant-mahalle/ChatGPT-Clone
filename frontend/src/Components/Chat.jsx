import { useState, useRef, useEffect, useContext } from 'react';
import { UserButton } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';
import send from '../assets/send.png';
import attachment from '../assets/attachment.png';
import chatifyIcon from '../assets/chatify-icon.svg';
import newChatIcon from '../assets/newChat.png';
import saveIcon from '../assets/save.svg';
import generateResponse from '../AIChatBot';
import { ChatContext } from './ChatContext';
import CodeBlock from './CodeBlock';

export default function Chatarea() {
    const { chatHistory, setChatHistory, activeChat, setActiveChat, saveChatToBackend } = useContext(ChatContext);
    const [prompt, setPrompt] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [chatHistory, activeChat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleChange = (e) => setPrompt(e.target.value);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmission(e);
        }
    };

    const handlePaste = (e) => {
        console.log("Pasted content:", e.clipboardData.getData('text'));
    };

    const handleFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileURL = URL.createObjectURL(file);
        const fileName = file.name;
        const fileMarkdownLink = `[${fileName}](${fileURL})`;

        setPrompt(prev => prev ? `${prev} ${fileMarkdownLink}` : fileMarkdownLink);
    };

    // Summarize and title the chat using Gemini
    const generateChatTitle = async (messages) => {
        if (!messages || messages.length === 0) return 'Untitled Chat';
        const chatText = messages.map(m => `${m.type === 'query' ? 'User' : 'AI'}: ${m.content}`).join("\n");
        const titlePrompt = `Given the following conversation between a user and an AI assistant, generate a short, descriptive title (max 8 words) that best summarizes the main topic or purpose of the chat. Only return the title, no extra text.\n\n${chatText}`;
        try {
            const response = await generateResponse(titlePrompt);
            // Clean up the response: remove quotes, trim whitespace, etc.
            return response.replace(/^"|"$/g, '').trim();
        } catch (error) {
            console.error("Error generating chat title:", error);
            return `Chat ${Date.now()}`;
        }
    };

    const handleSaveChat = async () => {
        if (!activeChat) return;
        const currentChat = chatHistory.find(chat => chat.id === activeChat);
        if (currentChat && currentChat.messages.length > 0) {
            const title = await generateChatTitle(currentChat.messages);
            setChatHistory(prev => prev.map(chat =>
                chat.id === activeChat ? { ...chat, title } : chat
            ));
            // Save to backend
            saveChatToBackend({ ...currentChat, title });
        } else if (currentChat) {
            setChatHistory(prev => prev.map(chat =>
                chat.id === activeChat && !chat.title ? { ...chat, title: `Empty conversation ${chat.id}` } : chat
            ));
        }
    };

    const handleStartNewChat = () => {
        setActiveChat(null);
        setPrompt("");
        setIsTyping(false);
    };

    const handleSubmission = async (e) => {
        e.preventDefault();
        if (prompt.trim() === "") return;

        const uniqueKey = Date.now();
        const userQuery = { type: 'query', id: uniqueKey, content: prompt };
        let chatId = activeChat;

        if (!activeChat) {
            const newChat = { id: uniqueKey, title: `New conversation ${chatHistory.length + 1}`, messages: [userQuery] };
            setChatHistory(prev => [newChat, ...prev]);
            setActiveChat(newChat.id);
            chatId = newChat.id; // Use this for the rest of the function
        } else {
            setChatHistory(prev => prev.map(chat =>
                chat.id === activeChat ? { ...chat, messages: [...(chat.messages || []), userQuery] } : chat
            ));
        }

        setPrompt("");
        setIsTyping(true);

        try {
            const responseContent = await generateResponse(prompt);
            const botResponse = { type: 'response', id: Date.now(), content: responseContent };
            setChatHistory(prev => prev.map(chat =>
                chat.id === (chatId || activeChat) ? { ...chat, messages: [...(chat.messages || []), botResponse] } : chat
            ));
        } catch (error) {
            console.error("Error generating response:", error);
            const errorResponse = { type: 'response', id: Date.now(), content: "Sorry, something went wrong." };
            setChatHistory(prev => prev.map(chat =>
                chat.id === (chatId || activeChat) ? { ...chat, messages: [...(chat.messages || []), errorResponse] } : chat
            ));
        } finally {
            setIsTyping(false);
        }
    };

    const messageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 10 }
        },
        exit: { opacity: 0, x: -20 }
    };

    const typingIndicatorVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const dotVariants = {
        hidden: { opacity: 0, y: -5 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { yoyo: Infinity, duration: 0.8 }
        }
    };

    const renderMessageContent = (content) => {
        // Regular expression to match code blocks
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = codeBlockRegex.exec(content)) !== null) {
            // Add text before the code block
            if (match.index > lastIndex) {
                parts.push({
                    type: 'text',
                    content: content.slice(lastIndex, match.index)
                });
            }

            // Add the code block
            parts.push({
                type: 'code',
                language: match[1] || 'plaintext',
                content: match[2].trim()
            });

            lastIndex = match.index + match[0].length;
        }

        // Add any remaining text
        if (lastIndex < content.length) {
            parts.push({
                type: 'text',
                content: content.slice(lastIndex)
            });
        }

        return parts.map((part, index) => {
            if (part.type === 'code') {
                return <CodeBlock key={index} code={part.content} language={part.language} />;
            }
            return <span key={index}>{part.content}</span>;
        });
    };

    return (
        <div className="w-full h-screen flex flex-col bg-[#212121]">
            <header className='border-b border-gray-700 p-4 flex justify-between items-center'>
                <h1 className='text-2xl font-semibold text-gray-300 flex items-center'>
                    <img src={chatifyIcon} className='h-8 mr-2' alt="Chatify" />
                    Chatify
                </h1>
                <div className='flex items-center gap-4'>
                    <button onClick={handleSaveChat} className='p-2 rounded-full hover:bg-gray-700 transition-colors' title="Save Chat">
                        <img src={saveIcon} className='h-5' alt="Save" />
                    </button>
                    <button onClick={handleStartNewChat} className='p-2 rounded-full hover:bg-gray-700 transition-colors' title="New Chat">
                        <div className='flex gap-2 justify-center items-center'>
                            <img src={newChatIcon} className='h-5' style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }} alt="New Chat" />
                            <span className='text-white'>New Chat</span>
                        </div>
                    </button>
                    <UserButton afterSignOutUrl="/" />
                </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <AnimatePresence initial={false}>
                    {activeChat && chatHistory.find(chat => chat.id === activeChat)?.messages?.length > 0 ? (
                        chatHistory.find(chat => chat.id === activeChat).messages.map((entry) => (
                            <motion.div key={entry.id} initial="hidden" animate="visible" exit="exit" variants={messageVariants} className={`flex ${entry.type === 'query' ? 'justify-end' : 'justify-start'}`}>
                                {entry.type === 'query' ? (
                                    <div className="bg-[#10a37f] text-white max-w-[80%] md:max-w-[40rem] p-4 rounded-2xl rounded-tr-none shadow-lg">
                                        {renderMessageContent(entry.content)}
                                    </div>
                                ) : (
                                    <div className="bg-[#2f2f2f] text-white max-w-[80%] md:max-w-[40rem] p-4 rounded-2xl rounded-tl-none shadow-lg flex">
                                        <img src={chatifyIcon} className="h-8 mr-3 self-start" style={{ filter: 'invert(80%) brightness(100%) contrast(85%)' }} alt="AI" />
                                        <div className="flex-1">
                                            {renderMessageContent(entry.content)}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center">
                            <img src={chatifyIcon} className="h-20 mb-4" style={{ filter: 'invert(80%) brightness(100%) contrast(85%)' }} alt="Chatify" />
                            <p className="text-lg">Start a new conversation or select a recent chat from the sidebar.</p>
                        </div>
                    )}
                </AnimatePresence>

                {isTyping && (
                    <motion.div initial="hidden" animate="visible" variants={typingIndicatorVariants} className="flex justify-start">
                        <div className="bg-[#2f2f2f] text-white p-4 rounded-2xl rounded-tl-none shadow-lg flex items-center">
                            <img src={chatifyIcon} className="h-8 mr-3" style={{ filter: 'invert(80%) brightness(100%) contrast(85%)' }} alt="AI" />
                            <div className="flex space-x-1">
                                {[0, 1, 2].map((i) => (
                                    <motion.div key={i} variants={dotVariants} className="w-2 h-2 bg-gray-400 rounded-full" />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-700">
                <motion.form onSubmit={handleSubmission} className="relative" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <input
                        ref={inputRef}
                        value={prompt}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
                        placeholder="Message Chatify..."
                        className="w-full bg-[#2f2f2f] text-white p-4 pr-16 rounded-full focus:outline-none focus:ring-2 focus:ring-[#10a37f] transition-all"
                        aria-label="Enter your message"
                    />
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,image/*"
                        className="hidden"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                        <button type="button" className="p-2 rounded-full hover:bg-gray-700 transition-colors" onClick={handleFileClick} aria-label="Attach file">
                            <img src={attachment} className="h-5" style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }} alt="Attach" />
                        </button>
                        <button
                            type="submit"
                            disabled={!prompt.trim()}
                            className={`p-2 rounded-full transition-colors ${prompt.trim() ? 'bg-[#10a37f] hover:bg-[#0d8a6d]' : 'bg-gray-600 cursor-not-allowed'}`}
                            aria-label="Send message"
                        >
                            <img src={send} className="h-5" style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }} alt="Send" />
                        </button>
                    </div>
                </motion.form>
                <p className="text-xs text-gray-500 mt-2 text-center">
                    Chatify can make mistakes. Consider checking important information.
                </p>
            </div>
        </div>
    );
}
