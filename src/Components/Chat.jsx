import send from '../assets/send.png';
import attachment from '../assets/attachment.png';
import chatgpticon from '../assets/chatGPT.png';
import upload from '../assets/upload.png'
import { useState } from 'react';
import genarateResponse from '../AIChatBot';

export default function Chatarea() {
    const [prompt, setPrompt] = useState("");
    const [chatHistory, setChatHistory] = useState([]); // Combined state for both query and response

    function handleChanges(e) {
        setPrompt(e.target.value);
    }

    const handleSubmission = async (e) => {
        e.preventDefault();
        if (prompt.trim() !== "") {
            const uniqueKey = Date.now();

            // User's query
            const userQuery = {
                type: 'query',
                id: uniqueKey,
                content: prompt,
            };

            // Update chat history with user's query
            setChatHistory((prevChat) => [...prevChat, userQuery]);

            setPrompt(""); // Clear the input field after submission

            // Generate the response
            const responseContent = await genarateResponse(prompt);

            // Bot's response
            const botResponse = {
                type: 'response',
                id: Date.now() + 1, // Ensure a unique key for the response
                content: responseContent,
            };

            // Update chat history with bot's response
            setChatHistory((prevChat) => [...prevChat, botResponse]);

        }
    };

    return (
        <div className="w-[82%] justify-between h-screen flex flex-col items-center ">
            <div id="responseArea" className="w-full h-[85%] m-2 ml-5">
                <header className='border-solid p-2 flex justify-between'>
                    <span className='text-2xl text-gray-400'>ChatGPT</span>
                    <div className='flex items-center gap-5 justify-center'>
                        <span><img src={upload} style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }} className='w-8 p-1 pb-2' /></span>
                        <span className='bg-blue-700 text-gray-200 w-7 h-7 rounded-full flex items-center justify-center'>V</span>
                    </div>
                </header>
                <div id='mainResponseArea' className='flex flex-col h-[90%] overflow-y-auto p-2 m-2 '>
                    {chatHistory.map((entry) =>
                        entry.type === 'query' ? (
                            <div
                                key={entry.id}
                                className='self-end bg-[#2f2f2f] text-wrap max-w-[30rem] p-3 px-5 shadow-lg shadow-zinc-800 text-white font-medium rounded-lg'
                            >
                                {entry.content}
                            </div>
                        ) : (
                            <div
                                key={entry.id}
                                className='self-start p-3 px-5 w-[50rem] text-wrap text-white font-medium rounded-lg'
                            >
                                <span>
                                    <img
                                        className='h-8'
                                        src={chatgpticon}
                                        style={{ filter: 'invert(80%) brightness(100%) contrast(85%)' }}
                                        alt="ChatGPT Icon"
                                    />
                                </span>
                                <pre className='text-sm text-wrap '>{entry.content}</pre>
                            </div>
                        )
                    )}
                </div>
            </div>

            <div id="inputPrompt" className="bg-[#2f2f2f] shadow-lg shadow-black w-[50rem] flex justify-between items-center mb-8 p-2 m-1 rounded-full ">
                <button className='p-1'>
                    <img
                        src={attachment}
                        className='h-5'
                        style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }}
                        alt="Attachment Icon"
                    />
                </button>
                <input
                    onChange={handleChanges}
                    value={prompt}
                    placeholder='Search with ChatGPT'
                    className="w-[45rem] outline-none text-white bg-transparent p-1"
                    type="text"
                />
                <button onClick={handleSubmission} type='submit' className='p-1'>
                    <img
                        src={send}
                        className='h-6'
                        style={{ filter: 'invert(1) brightness(100%) contrast(85%)' }}
                        alt="Send Icon"
                    />
                </button>
            </div>
        </div>
    );
}
