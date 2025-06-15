import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import newChatIcon from '../assets/newChat.png';
import hamburgerIcon from '../assets/hamburger.png';
import chatHistoryIcon from '../assets/chatHistory.png';
import settingsIcon from '../assets/settings.png';
import helpIcon from '../assets/help.png';
import { ChatContext } from './ChatContext';

export default function Sidebar({ isMobileOpen, toggleMobileSidebar }) {
    console.log("Sidebar - ChatContext:", ChatContext);
    const chatContext = useContext(ChatContext);

    if (!chatContext) {
        throw new Error('Sidebar must be used within a ChatProvider');
    }

    const { chatHistory, setChatHistory, activeChat, setActiveChat } = chatContext;
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleNewChat = () => {
        setActiveChat(null);
    };

    useEffect(() => {
        if (isMobileOpen && window.innerWidth < 1024) {
            toggleMobileSidebar();
        }
    }, [activeChat, toggleMobileSidebar, isMobileOpen]);

    const sidebarVariants = {
        open: { width: '16rem', opacity: 1 },
        collapsed: { width: '5rem', opacity: 1 },
        mobileOpen: { x: 0, opacity: 1 },
        mobileClosed: { x: '-100%', opacity: 0 }
    };

    return (
        <>
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={toggleMobileSidebar}
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={false}
                animate={
                    isMobileOpen 
                        ? 'mobileOpen' 
                        : window.innerWidth < 1024 
                            ? 'mobileClosed' 
                            : isCollapsed 
                                ? 'collapsed' 
                                : 'open'
                }
                variants={sidebarVariants}
                className={`
                    fixed lg:relative z-50 h-screen flex flex-col
                    bg-[#171717] text-white overflow-hidden
                    border-r border-gray-800 shadow-xl
                `}
                transition={{ type: 'spring', damping: 25 }}
            >
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleSidebar}
                        className="p-1 rounded-md hover:bg-gray-800 transition-colors"
                        aria-label="Toggle sidebar"
                    >
                        <img 
                            src={hamburgerIcon} 
                            className="h-6 w-6" 
                            style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }} 
                            alt="Menu" 
                        />
                    </motion.button>

                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleNewChat}
                                className={`
                                    flex items-center gap-2 px-2 py-2 rounded-md
                                    bg-[#10a37f] hover:bg-[#0d8a6d] transition-colors
                                `}
                                aria-label="Start new chat"
                            >
                                <img 
                                    src={newChatIcon} 
                                    className="h-4 w-4" 
                                    style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }} 
                                    alt="New chat" 
                                />
                                <span>New chat</span>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex-1 overflow-y-auto py-2">
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="px-2"
                            >
                                <h3 className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Recent conversations
                                </h3>
                                <ul className="space-y-1">
                                    {chatHistory.map((chat) => (
                                        <motion.li
                                            key={chat.id}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                        >
                                            <button
                                                onClick={() => setActiveChat(chat.id)}
                                                className={`
                                                    w-full text-left px-3 py-2 rounded-md
                                                    ${activeChat === chat.id ? 'bg-gray-800' : 'hover:bg-gray-800'}
                                                    transition-colors truncate
                                                `}
                                                aria-label={`Select conversation: ${chat.title}`}
                                            >
                                                {chat.title}
                                            </button>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="p-4 border-t border-gray-800">
                    <AnimatePresence>
                        {!isCollapsed ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-3"
                            >
                                <button className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-800 transition-colors" aria-label="Help and FAQ">
                                    <img 
                                        src={helpIcon} 
                                        className="h-5 w-5" 
                                        style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }} 
                                        alt="Help" 
                                    />
                                    <span>Help & FAQ</span>
                                </button>
                                <button className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-800 transition-colors" aria-label="Settings">
                                    <img 
                                        src={settingsIcon} 
                                        className="h-5 w-5" 
                                        style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }} 
                                        alt="Settings" 
                                    />
                                    <span>Settings</span>
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center space-y-3"
                            >
                                <button className="p-2 rounded-md hover:bg-gray-800 transition-colors" aria-label="Help and FAQ">
                                    <img 
                                        src={helpIcon} 
                                        className="h-5 w-5" 
                                        style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }} 
                                        alt="Help" 
                                    />
                                </button>
                                <button className="p-2 rounded-md hover:bg-gray-800 transition-colors" aria-label="Settings">
                                    <img 
                                        src={settingsIcon} 
                                        className="h-5 w-5" 
                                        style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }} 
                                        alt="Settings" 
                                    />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </>
    );
}