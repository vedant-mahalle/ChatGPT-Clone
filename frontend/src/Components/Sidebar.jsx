import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import newChatIcon from '../assets/newChat.png';
import hamburgerIcon from '../assets/hamburger.png';
import chatHistoryIcon from '../assets/chatHistory.png'; // Add this asset
import settingsIcon from '../assets/settings.png'; // Add this asset
import helpIcon from '../assets/help.png'; // Add this asset

export default function Sidebar({ isMobileOpen, toggleMobileSidebar }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: 'How to build a React app' },
    { id: 2, title: 'JavaScript best practices' },
    { id: 3, title: 'CSS animation techniques' },
  ]);

  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Create new chat
  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: `New conversation ${chatHistory.length + 1}`
    };
    setChatHistory([newChat, ...chatHistory]);
    setActiveChat(newChat.id);
  };

  // Close sidebar on mobile when a chat is selected
  useEffect(() => {
    if (isMobileOpen && window.innerWidth < 1024) {
      toggleMobileSidebar();
    }
  }, [activeChat]);

  // Animation variants
  const sidebarVariants = {
    open: { width: '16rem', opacity: 1 },
    collapsed: { width: '5rem', opacity: 1 },
    mobileOpen: { x: 0, opacity: 1 },
    mobileClosed: { x: '-100%', opacity: 0 }
  };

  return (
    <>
      {/* Mobile overlay */}
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

      {/* Sidebar */}
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
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-800 transition-colors"
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
                  flex items-center gap-2 px-3 py-2 rounded-md
                  bg-[#10a37f] hover:bg-[#0d8a6d] transition-colors
                `}
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

        {/* Chat history */}
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

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <AnimatePresence>
            {!isCollapsed ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <button className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-800 transition-colors">
                  <img 
                    src={helpIcon} 
                    className="h-5 w-5" 
                    style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }} 
                    alt="Help" 
                  />
                  <span>Help & FAQ</span>
                </button>
                <button className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-800 transition-colors">
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
                <button className="p-2 rounded-md hover:bg-gray-800 transition-colors">
                  <img 
                    src={helpIcon} 
                    className="h-5 w-5" 
                    style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }} 
                    alt="Help" 
                  />
                </button>
                <button className="p-2 rounded-md hover:bg-gray-800 transition-colors">
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