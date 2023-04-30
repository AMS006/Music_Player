import { BsFillVolumeMuteFill, BsFillVolumeDownFill, BsFillVolumeUpFill } from 'react-icons/bs'
interface Props {
  min: number,
  max: number,
  volume: number,
  setVolume: React.Dispatch<React.SetStateAction<number>>
}
function VolumeBar({ min, max, volume, setVolume }: Props) {
  return (
    <div className="flex gap-1 items-center">
      <div>
        {Number(volume) <= 0.5 && Number(volume) > 0 && <BsFillVolumeDownFill size={25} onClick={() => setVolume(0.6)} />}
        {Number(volume) == 0 && <BsFillVolumeMuteFill size={25} onClick={() => setVolume(0.5)} />}
        {Number(volume) > 0.5 && <BsFillVolumeUpFill size={25} onClick={() => setVolume(0)} />}
      </div>
      <input type="range" step={'any'} min={min} max={max} value={volume} onChange={(e: any) => setVolume(e.target.value)} name="" id="" className="h-1 accent-blue-800" />
    </div>
  )
}

export default VolumeBar
