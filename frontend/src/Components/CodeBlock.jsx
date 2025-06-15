import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CodeBlock({ code, language }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="relative my-4 rounded-lg overflow-hidden w-fit max-w-full">
            <div className="flex items-center justify-between bg-[#1e1e1e] px-4 py-2 min-w-[200px]">
                <span className="text-sm text-gray-400">{language}</span>
                <button
                    onClick={handleCopy}
                    className="text-sm text-gray-400 hover:text-white transition-colors ml-4"
                >
                    {copied ? 'Copied!' : 'Copy code'}
                </button>
            </div>
            <div className="bg-[#1e1e1e] p-4">
                <pre className="whitespace-pre-wrap break-words">
                    <code className="text-sm text-gray-200 font-mono">{code}</code>
                </pre>
            </div>
        </div>
    );
} 