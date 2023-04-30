import { ImLoop } from 'react-icons/im'
import { BiShuffle } from 'react-icons/bi'
import { AiFillPauseCircle, AiFillPlayCircle, AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setNextSong, setPlayPause } from '../redux/songReducer';
interface Props {
  isActive: boolean,
  isPlaying: boolean,
  loop: boolean,
  setLoop: React.Dispatch<React.SetStateAction<boolean>>
}
function Controls({ isActive, isPlaying, loop, setLoop }: Props) {
  const dispatch = useAppDispatch()
  const { currentSongs, currentIdx } = useAppSelector((state) => state.songs)
  const handlePause = () => {
    dispatch(setPlayPause({ type: false }))
  }
  const handlePlay = () => {
    dispatch(setPlayPause({ type: true }))
  }
  const handleNextSong = () => {
    let val: number = 0;
    if (currentIdx >= 0 && currentSongs) {
      val = (currentIdx + 1) % currentSongs.length
    }
    dispatch(setNextSong({ idx: val }))
  }
  const handlePrevSong = () => {
    let val: number = 0;
    if (currentIdx >= 0 && currentSongs) {
      val = (currentIdx - 1) % currentSongs.length
    }
    dispatch(setNextSong({ idx: val }))
  }
  return (
    <>
      {isActive && <div className="flex items-center justify-center gap-4 text-white">
        <div>
          <BiShuffle size={25} className='cursor-pointer' />
        </div>
        <div>
          <AiFillStepBackward size={25} className='cursor-pointer' onClick={handlePrevSong} />
        </div>
        <div>
          {isPlaying ?
            <AiFillPauseCircle size={35} className='cursor-pointer' onClick={handlePause} /> :
            <AiFillPlayCircle size={35} className='cursor-pointer' onClick={handlePlay} />}
        </div>
        <div>
          <AiFillStepForward size={25} className='cursor-pointer' onClick={handleNextSong} />
        </div>
        <div>
          <ImLoop size={20} className={`cursor-pointer ${loop ? 'text-blue-700' : 'text-white'}`} onClick={() => setLoop(!loop)} />
        </div>
      </div>
      }
    </>
  )
}

export default Controls
