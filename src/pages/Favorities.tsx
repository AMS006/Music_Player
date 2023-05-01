import { useEffect } from "react"
import SongCard from "../components/SongCard";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setCurrentSongs, setFavoritiesSong } from "../redux/songReducer";
import { useLocation } from "react-router-dom";


function Favorities() {
  const dispatch = useAppDispatch();
  const { favorities } = useAppSelector((state) => state.songs)
  const { pathname } = useLocation()
  useEffect(() => {
    const favo = JSON.parse(localStorage.getItem('favorities') || "{}")
    dispatch(setFavoritiesSong(favo))
    dispatch(setCurrentSongs(favo))
  }, [localStorage])
  useEffect(() => {
    const favo = JSON.parse(localStorage.getItem('favorities') || "{}")
    setCurrentSongs(favo)
  }, [pathname])
  if(!favorities || favorities?.length ==0 ){
    return <div className="w-full">
      <h2 className="py-6 text-center text-gray-300 font-semibold">No Favorite Song Added </h2>
    </div>
  }
  return (
    <div className='text-white text-2xl px-4'>
      <h1 className="py-4 font-semibold">Your Favorite Songs</h1>
      <div className="flex gap-6 flex-wrap md:justify-start justify-center">
        {favorities && favorities?.length > 0 && favorities.map((favorite, idx) => (
          <SongCard song={favorite} idx={idx} key={favorite.key}/>
        ))}
      </div>
    </div>
  )
}

export default Favorities