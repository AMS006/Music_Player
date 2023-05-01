import axios from 'axios'
import { getPlaylistSongSearchSuccess, getSongRequest, getSongSearchSuccess, setError } from "./songReducer";


export const getSearchSong = (inputData: string) => async(dispatch : any) =>{
  let key:string = import.meta.env.VITE_RAPID_API_KEY
    const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/search',
        params: {
          term: inputData,
          locale: 'en-US',
          offset: '0',
          limit: '10'
        },
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': key,
          'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
      };
      try {
        dispatch(getSongRequest())
        const {data} = await axios.request(options);
  
        dispatch(getSongSearchSuccess(data?.tracks?.hits))
      } catch (error) {
        dispatch(setError())
      }
}

export const getPlaylistSearchSong = (inputData: string) => async(dispatch : any) =>{
  let key:string = import.meta.env.VITE_RAPID_API_KEY
  const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/search',
      params: {
        term: inputData,
        locale: 'en-US',
        offset: '0',
        limit: '10'
      },
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
      }
    };
    try {
      dispatch(getSongRequest())
      const {data} = await axios.request(options);

      dispatch(getPlaylistSongSearchSuccess(data?.tracks?.hits))
    } catch (error) {
      dispatch(setError())
    }
}