// import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { FaBars } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
function Navbar() {
  const data: { name: String, link: String }[] = ([
    {
      name: "Home",
      link: ""
    },
    {
      name: "Favorities",
      link: "favorities"
    },
    {
      name: "Playlists",
      link: "playlists"
    }
  ])
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);



  return (
    <div className='flex justify-between  items-center sticky top-0 z-10  py-3 bg-[#251f39] w-full md:px-2 px-0'>
      <SearchBar />
      <div className='text-white text-3xl px-3 md:hidden flex cursor-pointer ' onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <IoClose /> : <FaBars />}
      </div>
      {/* Mobile SideBar */}
      <div className={`gap-20  px-4 md:hidden flex flex-col absolute bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10  transition-all ease-in duration-150 text-white items-center pt-16 h-screen w-[230px]  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} top-0 left-0`}>
        <div className='w-[110px] flex items-center flex-col'>
          <img src="http://4.bp.blogspot.com/-zhGTa1yxkrE/UbYBdc06nVI/AAAAAAAAAe4/mapFmFORf1M/s1600/iTunes-icon.png" alt="Logo" />
          <h1 className='font-semibold text-white'>𝕄𝕦𝕤𝕚𝕔 ℙ𝕝𝕒𝕪𝕖𝕣</h1>
        </div>
        <div className='flex flex-col gap-6 items-center justify-center'>
          {data.map((item, index) => (
            <Link to={`${item.link}`} key={index} className='hover:bg-slate-400 w-full rounded-full text-center py-2 px-3  transition-all ease-in duration-75' onClick={() => setSidebarOpen(false)}>{item.name}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar