import axios from 'axios'
import { getPlaylistSongSearchSuccess, getSongRequest, getSongSearchSuccess } from "./songReducer";


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
        console.log(error)
      }
}

export const getPlaylistSearchSong = (inputData: string) => async(dispatch : any) =>{
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
        'X-RapidAPI-Key': '0c8c01d17cmsh8c9ca657ec90434p17601cjsnfbf0f8fe8f2b',
        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
      }
    };
    try {
      dispatch(getSongRequest())
      const {data} = await axios.request(options);

      dispatch(getPlaylistSongSearchSuccess(data?.tracks?.hits))
    } catch (error) {
      console.log(error)
    }
}