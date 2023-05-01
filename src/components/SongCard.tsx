import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../redux/store';
import { Song, setActiveSong, setFavoritiesSong, setPlayPause } from '../redux/songReducer';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'
import { useEffect, useState } from 'react';

function SongCard({ song, idx }: { song: any, idx: number }) {

    const dispatch = useAppDispatch()
    const handleActiveSong = (): void => {
        dispatch(setActiveSong({ song, idx }))
    }

    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const { activeSong, isPlaying, favorities } = useAppSelector((state) => state.songs)

    useEffect(() => {
        if (favorities && favorities.length > 0) {
            for (let i = 0; i < favorities.length; i++) {
                if (favorities[i].key === song.key) {
                    setIsFavorite(true);
                    break;
                }
            }
        }
    }, [favorities])

    const handleAddFavourite = () => {

        if (favorities && favorities.length > 0) {
            let newFavorities = [...favorities, song]
            localStorage.setItem('favorities', JSON.stringify(newFavorities))
        } else {
            let newFavorities = [song]
            localStorage.setItem('favorities', JSON.stringify(newFavorities))
        }
        const favo = JSON.parse(localStorage.getItem('favorities') || "{}")
        dispatch(setFavoritiesSong(favo))
    }
    const handleRemoveFavorite = () => {
        if (favorities && favorities.length > 0) {
            let newFavorities: Song[] = favorities?.filter((favorite) => favorite.key !== song.key)
            dispatch(setFavoritiesSong(newFavorities))
            localStorage.setItem('favorities',JSON.stringify(newFavorities))
        }
    }
    const handlePause = () => {
        dispatch(setPlayPause({ type: false }))
    }

    return (
        <div className="flex flex-col w-[250px]  p-2 bg-white/5 bg-opacity-75 backdrop-blur-sm rounded-lg cursor-pointer">
            <div className="relative w-full h-full">
                <div className={`absolute inset-0  flex justify-center items-center text-white bg-black bg-opacity-0 hover:bg-opacity-50 ${activeSong && song.key === activeSong.key ? 'bg-opacity-50' : ''}`} >
                    {activeSong && (activeSong.key === song.key) && isPlaying ?
                        <span >
                            <BsFillPauseFill size={35} onClick={handlePause} />
                        </span> :
                        <span >
                            <BsFillPlayFill size={35} onClick={() => handleActiveSong()} />
                        </span>}
                </div>
                <img src={song?.images?.coverart} alt="Poster" />
            </div>
            <h3 className='text-white font-semibold truncate text-lg'>{song.title}</h3>
            <p className='text-white text-sm truncate'>{song.subtitle}</p>
            <div className='absolute top-3 z-10 right-3 text-3xl text-red-600' >
                {isFavorite ? <span title='Remove From Favorities' onClick={handleRemoveFavorite}><MdFavorite /></span> : <span onClick={handleAddFavourite} title='Add to Favorities'><MdFavoriteBorder /></span>}
            </div>
        </div>
    )
}

export default SongCard