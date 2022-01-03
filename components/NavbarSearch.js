import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react"

function NavbarSearch({ active }) {

    const timeOut = useRef();
    const [data, setData] = useState([])
    const [value, setValue] = useState('')

    const dataResult = useRef()
    const input = useRef()

    const handleKeyUpInput = (e) => {
        clearTimeout(timeOut)
        setValue(e.target.value)

        if (e.target.value !== "") {
            async function getSearchData() {
                const request = await fetch('/api/blogs/search/' + e.target.value)
                const { posts } = await request.json();

                setData(posts)
            }

            getSearchData()

        } else {
            setData([])
        }
    }

    useEffect(() => {
        window.addEventListener('click', eventClick)

        return () => {
            window.removeEventListener('click', eventClick)
        }
    })

    const eventClick = (e) => {
        if(dataResult.current && !dataResult.current.contains(e.target) && input.current && !input.current.contains(e.target)){
            setValue('')
            setData([])
        }

    }

    return (
        <>
            <div className={`grow ${active ? 'block' : 'hidden lg:block'} relative`}>
                <div className="flex flex-row items-center justify-between bg-white w-full md:w-8/12 rounded px-3 border md:border-none" ref={input}>
                    <input onChange={handleKeyUpInput} value={value} type="text" className="w-full focus:outline-none py-2 text-sm pr-3 accent-blue-500" placeholder="Search" />
                    <div className="block overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {
                    value.length > 0 && (
                        <div className="absolute top-0 bg-white mt-10 ring-1 ring-gray-200 shadow-md py-2 px-2 rounded w-72" ref={dataResult}>
                            <div className="flex flex-col divide-y divide-gray-300">
                                {
                                    data && data.length > 0 ? (
                                        data.map((item, i) => (
                                            <Fragment key={i}>
                                                <Link href={`/blogs/${item._id}`}>
                                                    <a className="flex flex-col space-y-1 px-3 py-2 hover:bg-gray-100 rounded group">
                                                        <h3 className="block text-blue-600 font-semibold group-hover:underline">{item.title}</h3>
                                                        <p className="block text-sm text-gray-600">{item.summary}</p>
                                                    </a>
                                                </Link>
                                            </Fragment>
                                        ))
                                    ) : (
                                        <div className="flex flex-col space-y-1 px-3 py-2">
                                            <h3 className="block text-gray-700 text-sm font-semibold">Post tidak ditemukan!</h3>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default NavbarSearch
