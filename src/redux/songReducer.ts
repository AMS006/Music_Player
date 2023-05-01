import { PayloadAction, createSlice } from "@reduxjs/toolkit"
interface Hub{
    type?: string,
    image?: string,
    actions: [{name:string,type:string,id:string},{name:string,type:string,uri:string}]
    options?: [],
    providers?: [],
    explicit? : boolean,
    displayname? : string

}
export interface Song{
    layout? : string,
    type? : string,
    key? : string,
    title? : string,
    subtitle? : string,
    share? : {[index: string]:string},
    images? : {[index: string]:string},
    hub? : Hub,
    artist? : {},
    url? : String
}
interface SongState{
    loading? :boolean,
    currentSongs? : Song[],
    searchedSongs?:Song[],
    currentIdx :number,
    playlistSearchedSong?: Song[],
    favorities? : Song[],
    playLists? : {name:string,key:number,songs:Song[]}[],
    isActive? : boolean,
    isPlaying : boolean,
    activeSong? : Song,
    error:String,
}
const initialState : SongState = {
    loading:false,
    currentSongs: [],
    searchedSongs : [],
    currentIdx:0,
    playlistSearchedSong: [],
    favorities: [],
    playLists : [],
    isActive: false,
    isPlaying: false,
    activeSong : {},
    error:""
}
export const SongSlice = createSlice({
    name:"songs",
    initialState,
    reducers:{
        getSongRequest:(state) =>{
            state.loading = true;
            state.error = ""
        },
        setCurrentSongs:(state,action: PayloadAction<Song[]>) =>{
            state.currentSongs = action.payload
        },
        getSongSearchSuccess:(state, action: PayloadAction<[]>) =>{
            state.searchedSongs = action.payload
            state.currentSongs = action.payload
            state.loading = false
        },
        getPlaylistSongSearchSuccess:(state, action: PayloadAction<[]>) =>{
            state.playlistSearchedSong = action.payload
            state.loading = false
        },
        removePlaylistSongSearch:(state) =>{
            state.playlistSearchedSong = []
        },
        setActiveSong:(state,action: PayloadAction<{song:any,idx:number}>) =>{
            state.activeSong = action.payload.song
            state.currentIdx = action.payload.idx
            state.isPlaying = true
            state.isActive = true
        },
        setNextSong:(state,action: PayloadAction<{idx:number}>)=>{
            if(state.currentSongs)
                state.activeSong = state.currentSongs[action.payload.idx]
            state.currentIdx = action.payload.idx
        },
        setPrevSong:(state,action: PayloadAction<{idx:number}>)=>{
            if(state.currentSongs)
                state.activeSong = state.currentSongs[action.payload.idx]
            state.currentIdx = action.payload.idx
        },
        setFavoritiesSong:(state,action:PayloadAction<Song[]>) =>{
            state.favorities = action.payload
        },
        setPlaylist:(state,action: PayloadAction<SongState["playLists"]>) =>{
            state.playLists = action.payload
        },
        setPlayPause:(state,action:PayloadAction<{type:boolean}>) =>{
            state.isPlaying = action.payload.type
        },
        closeSong:(state) =>{
            state.isActive = false
        },
        setError:(state) =>{
            state.loading = false
            state.error = "Sorry ! Internal Server Error Occured"
        },
        setErrorEmpty:(state) =>{
            state.error = ""
            state.loading = false
        }
    }
})

export const {getSongRequest,setCurrentSongs,setError,setErrorEmpty,getSongSearchSuccess,getPlaylistSongSearchSuccess,setNextSong,setPrevSong,removePlaylistSongSearch, setActiveSong,setPlaylist,setFavoritiesSong, setPlayPause,closeSong}  = SongSlice.actions
export default SongSlice.reducer;

