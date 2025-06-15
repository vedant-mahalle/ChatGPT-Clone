import { SignInButton } from "@clerk/clerk-react";
import chatifyIcon from '../assets/chatify-icon.svg';

export default function Home() {
  return (
    // Home Page for Signed Out Users
    <div className="flex flex-col items-center justify-between h-screen p-4 text-center text-white">
      {/* Header */}
      <header className="w-full py-4">
        <div className="container mx-auto flex justify-end">
          <SignInButton>
            <button className="px-4 py-2 bg-[#10a37f] hover:bg-[#0d8a6d] rounded-md transition-colors">
              Sign In
            </button>
          </SignInButton>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <img src={chatifyIcon} className="h-12" alt="Chatify" />
          <h1 className="text-4xl font-bold">Chatify</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full">
          <div className="p-4 bg-[#2b2b2b] rounded-lg">
            <h2 className="font-bold mb-2">Examples</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="p-3 hover:bg-[#3b3b3b] rounded cursor-pointer">
                "Explain quantum computing in simple terms"
              </li>
              <li className="p-3 hover:bg-[#3b3b3b] rounded cursor-pointer">
                "Got any creative ideas for a 10 year old's birthday?"
              </li>
              <li className="p-3 hover:bg-[#3b3b3b] rounded cursor-pointer">
                "How do I make an HTTP request in Javascript?"
              </li>
            </ul>
          </div>

          <div className="p-4 bg-[#2b2b2b] rounded-lg">
            <h2 className="font-bold mb-2">Capabilities</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="p-3">Remembers what user said earlier in the conversation</li>
              <li className="p-3">Allows user to provide follow-up corrections</li>
              <li className="p-3">Trained to decline inappropriate requests</li>
            </ul>
          </div>

          <div className="p-4 bg-[#2b2b3b] rounded-lg">
            <h2 className="font-bold mb-2">Limitations</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="p-3">May occasionally generate incorrect information</li>
              <li className="p-3">May occasionally produce harmful instructions or biased content</li>
              <li className="p-3">Limited knowledge of world and events after 2021</li>
            </ul>
          </div>
        </div>

        {/* Input Area */}
        <div className="w-full relative max-w-2xl">
          <input
            type="text"
            placeholder="Message Chatify..."
            className="w-full p-4 pr-16 bg-[#3b3b3b] rounded-lg focus:outline-none"
            onClick={() => document.querySelector('button')?.focus()}
          />
          <SignInButton>
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-[#10a37f] rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </SignInButton>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-xs text-gray-500 py-4">
        <p>© {new Date().getFullYear()} Chatify. By signing up, you agree to our Terms of Service and Privacy Policy.</p>
      </footer>
    </div>
  );
}
