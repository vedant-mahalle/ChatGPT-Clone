import { useState, useRef, useEffect } from 'react';
import { UserButton } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';
import send from '../assets/send.png';
import attachment from '../assets/attachment.png';
import chatgpticon from '../assets/chatGPT.png';
import upload from '../assets/upload.png';
import genarateResponse from '../AIChatBot';

export default function Chatarea() {
    const [prompt, setPrompt] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [chatHistory]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleKeyDown = (e) => {
        // Submit on Enter (but allow Shift+Enter for new lines)
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmission(e);
        }
    };

    const handlePaste = (e) => {
        // You could add special handling for pasted content here
        console.log("Pasted content:", e.clipboardData.getData('text'));
    };

    const handleSubmission = async (e) => {
        e.preventDefault();
        if (prompt.trim() === "") return;

        const uniqueKey = Date.now();
        const userQuery = {
            type: 'query',
            id: uniqueKey,
            content: prompt,
        };

        // Add user message with animation
        setChatHistory(prev => [...prev, userQuery]);
        setPrompt("");
        setIsTyping(true);

        // Generate response
        const responseContent = await genarateResponse(prompt);
        
        const botResponse = {
            type: 'response',
            id: Date.now(),
            content: responseContent,
        };

        // Add bot response with animation
        setChatHistory(prev => [...prev, botResponse]);
        setIsTyping(false);
    };

    // Animation variants
    const messageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                type: "spring", 
                stiffness: 100,
                damping: 10
            }
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
            transition: { 
                yoyo: Infinity,
                duration: 0.8
            }
        }
    };

    return (
        <div className="w-full h-screen flex flex-col bg-[#212121]">
            {/* Header */}
            <header className='border-b border-gray-700 p-4 flex justify-between items-center'>
                <h1 className='text-2xl font-semibold text-gray-300 flex items-center'>
                    <img 
                        src={chatgpticon} 
                        className='h-8 mr-2' 
                        style={{ filter: 'invert(80%) brightness(100%) contrast(85%)' }} 
                        alt="ChatGPT" 
                    />
                    ChatGPT
                </h1>
                <div className='flex items-center gap-4'>
                    <button className='p-2 rounded-full hover:bg-gray-700 transition-colors'>
                        <img src={upload} className='h-5' style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }} alt="Upload" />
                    </button>
                    <UserButton afterSignOutUrl="/" />
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <AnimatePresence initial={false}>
                    {chatHistory.map((entry) => (
                        <motion.div
                            key={entry.id}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={messageVariants}
                            className={`flex ${entry.type === 'query' ? 'justify-end' : 'justify-start'}`}
                        >
                            {entry.type === 'query' ? (
                                <div className="bg-[#10a37f] text-white max-w-[80%] md:max-w-[40rem] p-4 rounded-2xl rounded-tr-none shadow-lg">
                                    {entry.content}
                                </div>
                            ) : (
                                <div className="bg-[#2f2f2f] text-white max-w-[80%] md:max-w-[40rem] p-4 rounded-2xl rounded-tl-none shadow-lg flex">
                                    <img 
                                        src={chatgpticon} 
                                        className="h-8 mr-3 self-start" 
                                        style={{ filter: 'invert(80%) brightness(100%) contrast(85%)' }} 
                                        alt="AI" 
                                    />
                                    <div className="flex-1">
                                        <pre className="whitespace-pre-wrap font-sans text-sm">{entry.content}</pre>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={typingIndicatorVariants}
                        className="flex justify-start"
                    >
                        <div className="bg-[#2f2f2f] text-white p-4 rounded-2xl rounded-tl-none shadow-lg flex items-center">
                            <img 
                                src={chatgpticon} 
                                className="h-8 mr-3" 
                                style={{ filter: 'invert(80%) brightness(100%) contrast(85%)' }} 
                                alt="AI" 
                            />
                            <div className="flex space-x-1">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        variants={dotVariants}
                                        className="w-2 h-2 bg-gray-400 rounded-full"
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-700">
                <motion.form 
                    onSubmit={handleSubmission}
                    className="relative"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                >
                    <input
                        ref={inputRef}
                        value={prompt}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
                        onFocus={() => {
                            // Add any focus effects here
                        }}
                        onBlur={() => {
                            // Add any blur effects here
                        }}
                        placeholder="Message ChatGPT..."
                        className="w-full bg-[#2f2f2f] text-white p-4 pr-16 rounded-full focus:outline-none focus:ring-2 focus:ring-[#10a37f] transition-all"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                        <button 
                            type="button" 
                            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                            onClick={() => {
                                // Handle attachment click
                                console.log("Attachment clicked");
                            }}
                        >
                            <img src={attachment} className="h-5" style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }} alt="Attach" />
                        </button>
                        <button 
                            type="submit" 
                            disabled={!prompt.trim()}
                            className={`p-2 rounded-full transition-colors ${prompt.trim() ? 'bg-[#10a37f] hover:bg-[#0d8a6d]' : 'bg-gray-600 cursor-not-allowed'}`}
                        >
                            <img src={send} className="h-5" style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }} alt="Send" />
                        </button>
                    </div>
                </motion.form>
                <p className="text-xs text-gray-500 mt-2 text-center">
                    ChatGPT can make mistakes. Consider checking important information.
                </p>
            </div>
        </div>
    );
}