import Link from "next/link";
import { useRef, useState } from "react"

function NavbarSearch() {

    const timeOut = useRef();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState('')

    const handleKeyUpInput = async (e) => {
        // await setValue(e.target.value)
        clearTimeout(timeOut)

        if (e.target.value !== "") {
            // setLoading(true)
            timeOut = setTimeout(() => {
                alert(3)
                async function getSearchData() {
                    const request = await fetch('/api/blogs/search/' + e.target.value)
                    const { posts } = await request.json();

                    setData(posts)
                    // setLoading(false)
                }

                getSearchData()

            }, 3000)
        } else {
            setData([])
        }
    }

    return (
        <>
            <div className="grow hidden lg:block relative">
                <div className="flex flex-row items-center justify-between bg-white w-8/12 rounded px-3">
                    <input onKeyUp={handleKeyUpInput} type="text" className="w-full focus:outline-none py-2 text-sm pr-3 accent-blue-500" placeholder="Search" />
                    <div className="block overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {
                    value.length > 0 && (
                        <div className="absolute top-0 bg-white mt-14 shadow-md py-2 px-2 rounded w-72">
                            <div className="flex flex-col divide-y divide-gray-300">
                                {
                                    loading ? (
                                        <div className="flex flex-col space-y-1 px-3 py-2">
                                            <h3 className="block text-gray-700 text-sm font-semibold">Loading...</h3>
                                        </div>
                                    ) : (
                                        data && data.length > 0 ? (
                                            <Link href={'/'}>
                                                <a className="flex flex-col space-y-1 px-3 py-2 hover:bg-gray-100 rounded group">
                                                    <h3 className="block text-blue-600 font-semibold group-hover:underline">Ini title</h3>
                                                    <p className="block text-sm text-gray-600">Ini description</p>
                                                </a>
                                            </Link>
                                        ) : (
                                            <div className="flex flex-col space-y-1 px-3 py-2">
                                                <h3 className="block text-gray-700 text-sm font-semibold">Post tidak ditemukan!</h3>
                                            </div>
                                        )
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
