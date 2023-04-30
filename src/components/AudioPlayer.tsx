import { useEffect, useRef } from "react"
import { Song } from "../redux/songReducer"

interface Props {
  activeSong: Song,
  isPlaying: boolean,
  currTime: number,
  volume: number,
  loop: boolean,
  setCurrTime: React.Dispatch<React.SetStateAction<number>>,
  setTime: React.Dispatch<React.SetStateAction<number>>
}
function AudioPlayer({ activeSong, isPlaying, currTime, volume, loop, setCurrTime, setTime }: Props) {
  const ref: any = useRef(null)
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }
  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = currTime;
  }, [currTime]);
  return (
    <div >
      <audio
        src={`${activeSong?.hub?.actions[1]?.uri}`}
        ref={ref}
        loop={loop}
        onLoadedData={(e: any) => setTime(e.target.duration)}
        onTimeUpdate={(e: any) => setCurrTime(e.target.currentTime)}
      >
      </audio>
    </div>
  )
}

export default AudioPlayer