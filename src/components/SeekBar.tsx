interface Props {
  start: number
  end: number
  currTime: number
  setCurrTime: React.Dispatch<React.SetStateAction<number>>
}
function SeekBar({ start, end, currTime, setCurrTime }: Props) {
  const getTime = (time: number): string => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`

  return (
    <div className="flex gap-1 items-center justify-center w-full">
      <span>{getTime(currTime)}</span>
      <input
        type="range"
        min={start}
        max={end}
        value={currTime}
        onInput={(e: any) => setCurrTime(Number(e.target.value))}
        className=" h-1 w-56 accent-slate-800"
      />
      <span>{getTime(end)}</span>
    </div>
  )
}

export default SeekBar
