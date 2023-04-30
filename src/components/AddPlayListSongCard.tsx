import { useParams } from 'react-router-dom'
import { Song, setPlaylist } from '../redux/songReducer'
import { useAppDispatch } from '../redux/store'
import { useEffect, useState } from 'react'

function AddPlayListSongCard({ song }: any) {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const [isAdded, setIsAdded] = useState<boolean>(false)

    const handleAddToPlaylist = () => {
        const playlists = JSON.parse(localStorage.getItem('Playlist') || "{}")
        let playlist: { name?: string, key?: number, songs: Song[] } = { songs: [] };

        let otherPlaylist = []
        if (playlists && playlists.length > 0) {
            for (let i = 0; i < playlists.length; i++) {
                if (playlists[i].key !== Number(id))
                    otherPlaylist.push(playlists[i])
                if (playlists[i].key === Number(id))
                    playlist = playlists[i]
            }
        }

        let updatedPlaylist;
        let newSongs: Song[] = [];
        if (playlist !== undefined) {
            updatedPlaylist = { ...playlist }
            if (updatedPlaylist && updatedPlaylist?.songs?.length > 0)
                newSongs = [...updatedPlaylist.songs, song]

        }
        if (updatedPlaylist && updatedPlaylist?.songs)
            updatedPlaylist.songs = newSongs

        const newPlayList = [...otherPlaylist, updatedPlaylist]

        localStorage.setItem('Playlist', JSON.stringify(newPlayList))

        dispatch(setPlaylist(newPlayList))
    }
    useEffect(() => {
        const currPlaylists = JSON.parse(localStorage.getItem('Playlist') || "{}")
        let currPlaylist: { name?: string, key?: number, songs: Song[] } = { songs: [] };
        for (let i = 0; i < currPlaylists.length; i++) {
            if (currPlaylists[i].key === Number(id)) {
                currPlaylist = currPlaylists[i]
                for (let i = 0; i < currPlaylist.songs.length; i++) {
                    if (song.key === currPlaylist.songs[i].key) {
                        setIsAdded(true);
                        break;
                    }
                }
            }
        }
    }, [localStorage])


    return (
        <div className='flex justify-between ms:px-4 px-1 w-full'>
            <div className='flex md:gap-6 gap-4'>
                <div className='w-[80px]'>
                    <img src={song?.images?.coverart} alt="Poster" />
                </div>
                <div>
                    <h2 className='md:text-lg text-sm font-semibold'>{song.title}</h2>
                    <p className='md:text-base text-xs'>{song.subtitle}</p>
                </div>
            </div>
            <div>
                {isAdded ?
                    <button className='bg-[#251f39] text-white md:text-base text-sm px-2 py-1 rounded'>
                        Added
                    </button>
                    : <button className='bg-[#251f39] text-white px-2 py-1 rounded md:text-base text-sm' onClick={handleAddToPlaylist}>
                        Add to Playlist
                    </button>}
            </div>
        </div>
    )
}

export default AddPlayListSongCard
