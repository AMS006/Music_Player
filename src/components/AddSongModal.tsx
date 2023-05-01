import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IoClose } from 'react-icons/io5';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { BiSearch } from 'react-icons/bi';
import { getPlaylistSearchSong } from '../redux/songActions';
import { useAppDispatch, useAppSelector } from '../redux/store';
import Loading from './Loding'
import AddPlayListSongCard from './AddPlayListSongCard';
import { Song, removePlaylistSongSearch, setErrorEmpty } from '../redux/songReducer';
import { useParams } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AddSongModal({ open, setOpen }: Props) {


    const dispatch = useAppDispatch()
    const handleClose = () => {
        setOpen(false);
        dispatch(removePlaylistSongSearch())
    };
    const [searchData, setSearchData] = React.useState<string>("")
    const handleSearch = () => {
        if (searchData.length == 0)
            window.alert("No Input data")
        else {
            dispatch(getPlaylistSearchSong(searchData))
            setSearchData("")
        }
    }
    const { playLists,error } = useAppSelector((state) => state.songs)
    const { id } = useParams()
    if(error && error.length>0){
        window.alert(error)
        dispatch(setErrorEmpty())
    }
    let playlist: { name: string, key: number, songs: Song[] }
    if (playLists && playLists?.length > 0) {
        for (let i = 0; i < playLists.length; i++) {
            if (playLists[i].key === Number(id)) {
                playlist = playLists[i]
                break
            }
        }
    }
    const { playlistSearchedSong, loading } = useAppSelector((state) => state.songs)
    return (
        <div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: '#251f39' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <IoClose />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Sound
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className='flex items-center py-2 justify-center'>
                    <div className='relative font-semibold rounded-full border md:w-[350px] w-[260px] bg-white py-2 px-5 mx-4'>
                        <input type="text" name="search" id="search" value={searchData} onChange={(e) => setSearchData(e.target.value)} placeholder='Search for Songs' className='w-[90%] focus:outline-none text-[#251f39]' />
                        <button className='absolute right-0 cursor-pointer top-0 w-[40px] flex items-center justify-center text-xl bg-[#191624] text-white h-full ' style={{ borderRadius: '0px 50px 50px 0px' }} onClick={handleSearch}>
                            <BiSearch />
                        </button>
                    </div>
                </div>
                <div>
                    {loading ? <div> <Loading /> </div> :
                        <List>
                            {playlistSearchedSong && playlistSearchedSong.length > 0 && playlistSearchedSong.map(({ track }: any,idx) => (
                                <>
                                    <ListItem key={idx}>
                                        <AddPlayListSongCard song={track} playlist={playlist} />
                                    </ListItem>
                                    <Divider />
                                </>
                            ))}

                        </List>
                    }
                </div>
            </Dialog>
        </div>
    );
}
