import { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import Chatarea from "./Components/Chat";
import Sidebar from "./Components/Sidebar";
import Home from './Components/Home';

function App() {
  const [isMobileOpen, setIsMobileOpen] = useState(true);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  return (
    <div className='bg-[#212121] min-h-screen'>
      <header>
        <SignedOut>
          <Home />
        </SignedOut>

        <SignedIn>
          {/* Chat Interface for Signed In Users */}
          <div className='flex h-screen'>
            <Sidebar isMobileOpen={isMobileOpen} toggleMobileSidebar={toggleMobileSidebar} />
            <Chatarea />
          </div>
        </SignedIn>
      </header>
    </div>
  );
}

export default App;
