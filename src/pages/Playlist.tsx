import { useState, useEffect } from 'react'
import AddPlaylistDialogBox from '../components/AddPlaylistDialogBox'
import { setPlaylist } from '../redux/songReducer'
import { useAppDispatch, useAppSelector } from '../redux/store'
import PlayListCard from '../components/PlayListCard'
function Playlist() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const play = JSON.parse(localStorage.getItem('Playlist') || "{}")
    dispatch(setPlaylist(play))
  }, [localStorage])
  const { playLists } = useAppSelector((state) => state.songs)
  if(!playLists || playLists?.length ==0 ){
    return <div className="w-full">
      <h2 className="py-6 text-center text-gray-300 font-semibold">No Playlist Added</h2>
    </div>
  }
  return (
    <>
      <AddPlaylistDialogBox open={dialogOpen} setOpen={setDialogOpen} />
      <div className="text-white w-full p-4">
        <div className='flex justify-between items-center w-full'>
          <h1 className="text-xl font-semibold">Your Playlists</h1>
          <button className="bg-[#c9cad5] text-[#1a1a26] px-3 py-2 font-bold hover:opacity-95 transition-opacity duration-100 rounded" onClick={() => setDialogOpen(!dialogOpen)}>Create Playlist</button>
        </div>
        <div className='flex flex-wrap md:justify-start justify-center py-4 items-center gap-6'>
          {playLists && playLists.length > 0 && playLists.map((playlist) => (
            <PlayListCard playlist={playlist} key={playlist.key}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default Playlist