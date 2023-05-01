import { useSelector } from 'react-redux'
import SongCard from '../components/SongCard'
import Loading from '../components/Loding'
import { useAppDispatch } from '../redux/store'
import { setErrorEmpty } from '../redux/songReducer'

function HomePage() {
  const { loading, searchedSongs,error } = useSelector((state: any) => state.songs)
  if (loading) {
    return (
      <Loading />
    )
  }
  const dispatch = useAppDispatch()
  if(error && error.length>0){
    window.alert(error)
    dispatch(setErrorEmpty())
  }
  return (
    <>
      {searchedSongs?.length > 0 ? <div className='md:ml-4'>
        <h1 className='p-3 font-bold text-2xl text-white'>All Songs</h1>
        <p className='text-white px-3'>Search Results </p>
        <div className='flex flex-wrap items-center md:justify-start justify-center gap-6  px-1 py-4 '>
          {searchedSongs.map((song: any, i: number) => (
            <SongCard
              song={song.track}
              idx={i}
              key={i}
            />
          ))}
        </div>
      </div> : <div className='w-full py-8 text-gray-300 font-semibold text-center'>
        <span>Search For Songs</span>
      </div>}
    </>
  )
}

export default HomePage