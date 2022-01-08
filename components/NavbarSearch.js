import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import useResize from '../hook/resize'

function NavbarSearch({ active, closeSearch }) {

    const timeOut = useRef();
    const [data, setData] = useState([])
    const [value, setValue] = useState('')
    const [isFocus, setIsFocus] = useState(false)

    const { posts: posts_1 } = useSelector((state) => state.posts)
    const {blog_posts: {data: posts_2}} = useSelector(state => state.posts)
    const { posts: { data: posts_3 } } = useSelector(state => state.profile)
    const postsList = [...posts_1, ...posts_2, ...posts_3] || []

    const {width} = useResize()

    const dataResult = useRef()
    const input = useRef()
    const inputRef = useRef()

    const [loading, setLoading] = useState(false)

    const handleKeyUpInput = (e) => {
        clearTimeout(timeOut)
        setValue(e.target.value)

        if (e.target.value !== "") {
            const posts = [...new Map(postsList.map(item => [item._id, item])).values()].filter((item) => {
                if (item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1) {
                    return item;
                }
                return;
            }).slice(0, 5)

            if (posts.length == 0) {
                setData([])
                setLoading(true)
                timeOut = setTimeout(() => {
                    if (e.target.value != "" && posts.length == 0) {
                        async function getSearchData() {
                            const request = await fetch('/api/blogs/search/' + e.target.value)
                            const { posts } = await request.json();

                            setData(posts)
                            setLoading(false)
                        }

                        getSearchData()
                    }
                }, 500)
            } else {
                setData(posts)
            }
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

    const eventClick = useCallback((e) => {
        if (width < 768) {
            inputRef.current.focus()
        }

        if (active && !input.current.contains(e.target)) {
            closeSearch(false)
        }

        if (dataResult.current && !dataResult.current.contains(e.target) && input.current && !input.current.contains(e.target)) {
            setValue('')
            setData([])
        }

    })

    return (
        <>
            <div className={`grow ${active ? 'fixed !ml-0 bg-black/60 inset-0 w-full z-50' : 'hidden lg:block relative'}`}>
                <div className={`relative ${active ? 'w-3/4 mx-auto mt-11' : ''}`}>

                    <div className={`flex ${isFocus ? 'ring-2 ring-black md:ring-blue-700' : ''} flex-row items-center justify-between bg-white w-full rounded px-3 border md:border-none`} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} ref={input}>
                        <input onChange={handleKeyUpInput} value={value} type="text" className="w-full focus:outline-none py-2 text-sm pr-3 accent-blue-500" placeholder="Search" ref={inputRef} />
                        <div className="block overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {
                        value.length > 0 && (
                            <div className="absolute top-0 bg-white mt-10 ring-1 ring-gray-200 shadow-md py-2 px-2 rounded w-full overflow-y-auto" ref={dataResult}>
                                <div className="flex flex-col divide-y divide-gray-300">
                                    <div className="flex flex-col space-y-1 px-3 py-1 overflow-y-auto">
                                        <p className="text-xs lg:text-sm text-gray-700 break-all py-2 font-semibold">Mencari: {value}</p>
                                        <div className="border-t border-gray-300 w-full" />
                                        <div className="py-2">
                                            <p className="text-gray-700 text-xs lg:text-sm font-semibold">Hasil:</p>
                                            {
                                                data && data.length > 0 ? (
                                                    data.map((item, i) => (
                                                        <Fragment key={i}>
                                                            <Link href={`/blogs/${item._id}`}>
                                                                <a className="flex flex-col space-y-1 px-3 py-2 mt-1 bg-gray-100 hover:bg-gray-200 rounded group">
                                                                    <h3 className="block text-blue-600 font-semibold group-hover:underline">{item.title}</h3>
                                                                    <p className="block text-sm text-gray-600">{item.summary.substring(0, 200)}</p>
                                                                </a>
                                                            </Link>
                                                        </Fragment>
                                                    ))
                                                ) : (
                                                    loading ? (
                                                        <h3 className="text-gray-700 text-sm font-semibold py-2">Loading...</h3>
                                                    ) : (
                                                        <h3 className="text-gray-700 text-sm font-semibold py-2">Post tidak ditemukan!</h3>

                                                    )

                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default NavbarSearch
