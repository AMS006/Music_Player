import { Link, useLocation } from 'react-router-dom'

function Sidebar() {
    interface NavLinks {
        name: string,
        link: string
    }
    const data: NavLinks[] = ([
        {
            name: "Home",
            link: ""
        },
        {
            name: "Favorities",
            link: "favorities"
        },
        {
            name: "Playlists",
            link: "playlists"
        },

    ])
    const { pathname } = useLocation()
    return (
        <div className='md:flex hidden pt-16 items-center flex-col h-screen md:fixed gap-12 w-[240px] bg-[#191624] px-1 text-white font-semibold '>
            <div className='flex items-center flex-col w-[140px]'>
                <img src="http://4.bp.blogspot.com/-zhGTa1yxkrE/UbYBdc06nVI/AAAAAAAAAe4/mapFmFORf1M/s1600/iTunes-icon.png" alt="Logo" />
                <h1 className='font-bold text-xl text-white'>𝕄𝕦𝕤𝕚𝕔 ℙ𝕝𝕒𝕪𝕖𝕣</h1>
            </div>
            <div className='flex flex-col gap-6 w-full px-4'>
                {data.map((item: NavLinks, index: number) => (
                    <Link to={`${item.link}`} key={index} className={`hover:bg-[#c9cad5] hover:text-[#1a1a26] transition-all ease-in-out duration-100 font-bold ${pathname.substring(1, pathname.length) === item.link ? 'bg-[#c9cad5] text-[#1a1a26]' : ''} w-full rounded-full text-center py-2  transition-all ease-in duration-75`} >{item.name}</Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar