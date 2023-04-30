import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Song, setPlaylist } from '../redux/songReducer';
import { useAppDispatch, useAppSelector } from '../redux/store';

interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AddPlaylistDialogBox({ open, setOpen }: Props) {

    const handleClose = () => {
        setOpen(false);
    };
    const [name, setName] = React.useState<string>("")
    const { playLists } = useAppSelector((state) => state.songs)
    const dispatch = useAppDispatch()
    const handleAddPlaylist = () => {
        const playlist: {
            name: string,
            key: number,
            songs: Song[]
        } = {
            name,
            key: Date.now(),
            songs: []
        }
        let newPlayList = [];
        if (playLists && playLists.length > 0)
            newPlayList = [...playLists, playlist]
        else
            newPlayList = [playlist]

        dispatch(setPlaylist(newPlayList))
        localStorage.setItem('Playlist', JSON.stringify(newPlayList))
        setOpen(false)
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Playlist</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name of Playlist"
                        type="text"
                        fullWidth
                        variant="standard"
                        onInput={(e: any) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddPlaylist}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
