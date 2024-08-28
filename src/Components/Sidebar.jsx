import newChat from '../assets/newChat.png'
import hamburget from '../assets/hamburger.png'
export default function Sidebar(){
    return(
        <div id="sidebar" className='w-[16%] m-1 p-2 flex-col h-screen gap 2 rounded bg-[#171717] text-white hidden lg:flex'>
            <header className='flex justify-between my-3 px-1'>
                <img src={hamburget} className='h-7 ' style={{ filter: 'invert(1) brightness(100%) contrast(85%)'}} />
                <img src={newChat} className='h-7' style={{ filter: 'invert(1) brightness(100%) contrast(85%)'}} />
            </header>
        </div>
    )
}