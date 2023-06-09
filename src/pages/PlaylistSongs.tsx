import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/store'
import AddSongModal from '../components/AddSongModal'
import SongCard from '../components/SongCard'
import { setCurrentSongs } from '../redux/songReducer'

function PlaylistSongs() {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { playLists } = useAppSelector((state) => state.songs)
    let playlist = playLists?.find((play) => play.key === Number(id))
    useEffect(() => {
        if (playlist && playlist?.songs.length > 0)
            dispatch(setCurrentSongs(playlist.songs))
    }, [playlist, playLists,localStorage])
    const [open, setOpen] = useState(false)

    return (
        <>
            <AddSongModal open={open} setOpen={setOpen} />
            {playlist && <div className='w-full'>
                <div className='py-4 px-3 flex justify-between'>
                    <h2 className='text-white text-xl font-semibold'>{playlist.name}</h2>
                    <button className="bg-[#c9cad5] text-[#1a1a26] px-3 py-2 font-bold hover:opacity-95 transition-opacity duration-100 rounded" onClick={() => setOpen(!open)}>Add Songs</button>
                </div>
                {!playlist?.songs || playlist?.songs?.length ==0?
                <div className="w-full">
                    <h2 className="py-6 text-center text-gray-300 font-semibold">No Songs Added in {playlist.name}</h2>
                </div>
                 :<div className='flex flex-wrap px-3 py-4 gap-6 md:justify-start justify-center'>
                    {playlist.songs.map((song, idx: number) => (
                        <SongCard song={song} idx={idx} key={song.key}/>
                    ))}
                </div>}
            </div>}
        </>
    )
}

export default PlaylistSongs
