import { useState } from 'react'
import { useAppSelector } from "../redux/store"
import Controls from "./Controls"
import SeekBar from './SeekBar'
import VolumeBar from './VolumeBar'
import AudioPlayer from './AudioPlayer'

function SongBar() {
    const { activeSong, isActive, isPlaying } = useAppSelector((state) => state.songs)

    const [volume, setVolume] = useState<number>(0.3);
    const [time, setTime] = useState<number>(0);
    const [currTime, setCurrTime] = useState<number>(0)
    const [loop, setLoop] = useState<boolean>(false)
    return (
        <>
            {isActive && activeSong && <div className="fixed flex items-center justify-between py-3 md:px-6 px-2 text-white h-20 w-full bottom-0 bg-black opacity-90 backdrop-blur-lg z-20">
                <div className="gap-2 md:flex hidden md:w-1/4 w-0">
                    <div className="w-16 h-16 flex items-center justify-center">
                        <img src={activeSong?.images?.coverart} />
                    </div>
                    <div className="text-xs truncate flex justify-center flex-col">
                        <h3 className="font-semibold text-sm truncate">{activeSong.title}</h3>
                        <p className='truncate'>{activeSong.subtitle}</p>
                    </div>
                </div>
                <div className='w-full flex md:justify-center flex-col md:w-3/5'>
                    {activeSong && <Controls
                        isActive={isActive}
                        isPlaying={isPlaying}
                        loop={loop}
                        setLoop={setLoop}
                    />}
                    <SeekBar
                        start={0}
                        end={time}
                        currTime={currTime}
                        setCurrTime={setCurrTime}
                    />
                    <AudioPlayer
                        activeSong={activeSong}
                        isPlaying={isPlaying}
                        loop={loop}
                        setCurrTime={setCurrTime}
                        setTime={setTime}
                        currTime={currTime}
                        volume={volume}
                    />
                </div>
                <div className='md:flex hidden '>
                    <VolumeBar
                        min={0}
                        max={1}
                        volume={volume}
                        setVolume={setVolume}
                    />
                </div>
            </div>}
        </>
    )
}

export default SongBar