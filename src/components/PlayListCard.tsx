import { RiPlayListFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { Song } from '../redux/songReducer'
export interface playlist {
    name: string,
    key: number,
    songs: Song[]
}
function PlayListCard({ playlist }: any) {

    return (
        <Link to={`/playlists/${playlist.key}`} className='relative  flex flex-col w-[250px]  p-2 bg-white/5 bg-opacity-75 backdrop-blur-sm rounded-lg cursor-pointer hover:opacity-80'>
            <div className=''>
                <img src="https://yt3.ggpht.com/a/AATXAJzvNnbtJ5hgbK7SGqStTxj3_Btdx-f6bScgdA=s900-c-k-c0xffffffff-no-rj-mo" alt="logo" />
            </div>
            <div>
                <h2 className='text-xl font-semibold py-1'>{playlist.name}</h2>
            </div>
            <div className='absolute top-4 right-4 text-[#1a1a26] text-3xl'>
                <RiPlayListFill />
            </div>
        </Link>
    )
}

export default PlayListCard
