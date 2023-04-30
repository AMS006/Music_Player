import {Routes,Route} from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import { useEffect} from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import SongBar from './components/SongBar'
import Favorities from './pages/Favorities'
import Playlist from './pages/Playlist'
import PlaylistSongs from './pages/PlaylistSongs'
import { setPlaylist } from './redux/songReducer'
import { useAppDispatch } from './redux/store'

function App() {

  const dispatch = useAppDispatch()
  useEffect(() =>{
    const play = JSON.parse(localStorage.getItem('Playlist')  || "{}")
    dispatch(setPlaylist(play))
  },[localStorage])

  return(
    <div className='relative flex'>

      <Sidebar />
      <div className='flex flex-1 md:ml-[240px] h-[calc(100vh)] overflow-auto  flex-col bg-gradient-to-br from-black to-[#0b0b4d] '>
        <Navbar />
        <div className='flex flex-1 pb-24'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/favorities' element={<Favorities />} />
              <Route path='/playlists' element={<Playlist />} />
              <Route path='/playlists/:id' element={<PlaylistSongs />} />
            </Routes>
          </div>
      </div>
        <SongBar />

    </div>
  )
}

export default App
