import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useAppDispatch } from '../redux/store'
import { getSearchSong } from '../redux/songActions'
import { useNavigate } from 'react-router-dom'

function SearchBar() {

    const dispatch = useAppDispatch()
    const [searchData, setSearchData] = useState<string>("")
    const navigate = useNavigate()
    const handleSearch = async (): Promise<void> => {

        if (searchData.length == 0)
            window.alert("No Input data")
        else {
            navigate('/')
            dispatch(getSearchSong(searchData))
            setSearchData("")
        }
    }
    return (
        <div>
            <div className='relative font-semibold rounded-full border md:w-[350px] w-[260px] bg-white py-2 px-5 mx-4'>
                <input type="text" name="search" id="search" value={searchData} onChange={(e) => setSearchData(e.target.value)} placeholder='Search for Songs' className='w-[90%] focus:outline-none text-[#251f39]' />
                <button className='absolute right-0 cursor-pointer top-0 w-[40px] flex items-center justify-center text-xl bg-[#191624] text-white h-full ' style={{ borderRadius: '0px 50px 50px 0px' }} onClick={handleSearch}>
                    <BiSearch />
                </button>
            </div>
        </div>
    )
}

export default SearchBar
