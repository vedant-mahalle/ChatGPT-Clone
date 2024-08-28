import Chatarea from "./Components/Chat"
import Sidebar from "./Components/Sidebar"
function App() {
  return (
    <div className='bg-[#212121] '>
      <div className='flex'>
        <Sidebar />
        <Chatarea/>
      </div>
      </div>
  );
}

export default App
