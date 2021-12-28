import { Menu, Transition } from "@headlessui/react"
import Cookies from "js-cookie"
import Link from "next/link"
import Image from 'next/image'
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userIsLogin, userLogout } from "../action/userAction"
import { navbarAuth, navbarLinks } from "../constant/navbar"
import Container from "./Container"
import DropdownButton from "./DropdownButton"
import NavbarAuth from "./NavbarAuth"
import NavbarItem from "./NavbarItem"
import Avatar from "./Avatar"
import { profileConstant } from "../constant/redux"

function Navbar() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const router = useRouter();

    useEffect(() => {

        dispatch(userIsLogin())

    }, [])

    const handleUserLogout = (e) => {
        e.preventDefault()

        router.replace('/')

        Cookies.remove('_TOKEN')

        setTimeout(() => {
            dispatch(userLogout())
            dispatch({type: profileConstant.RESET_PROFILE})
        }, 1000)

    }


    return (
        <>
            <div className="w-full h-16 relative bg-white md:bg-blue-500  md:shadow-md z-50">
                <Container>
                    <div className="flex flex-row items-center justify-between h-full space-x-6">
                        <Link href={'/'}>
                            <a className="flex flex-row items-center justify-center space-x-2">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:h-8 md:w-8 text-gray-700 md:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h1 className="block text-gray-700 md:text-white font-semibold text-lg md:text-xl">Blogger Me</h1>
                            </a>
                        </Link>
                        <div className="grow hidden lg:block">
                            <div className="flex flex-row items-center justify-between bg-white w-8/12 rounded px-3 overflow-hidden">
                                <input type="text" className="w-full focus:outline-none py-2 text-sm pr-3 accent-blue-500" placeholder="Search" />
                                <div className="block overflow-hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-center md:divide-x divide-gray-200">
                            <ul className="hidden md:flex flex-row items-center justify-center px-4 md:px-6 space-x-6">
                                {
                                    navbarLinks &&
                                    navbarLinks.map((navItem) => (
                                        <NavbarItem key={navItem.id} navItem={navItem} />
                                    ))

                                }
                            </ul>

                            <ul className="hidden md:flex flex-row items-center justify-center px-4 md:px-6 space-x-4">
                                {
                                    auth.loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        auth.user ? (
                                            <li>
                                                <Menu as={'div'} className="relative">
                                                    <Menu.Button className="tracking-tight text-gray-800 px-5 text-sm font-semibold bg-white py-2 rounded flex flex-row items-center space-x-2">
                                                        <div className="w-7 h-7 bg-gray-200 rounded-full overflow-hidden relative flex-none mr-1">
                                                            <Image src={'/images/img-blog3.png'} alt="image" layout="fill" />
                                                        </div>
                                                        <span className="block">{auth.user.username}</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </Menu.Button>
                                                    <Transition
                                                        enter="transition duration-100 ease-out"
                                                        enterFrom="opacity-0 "
                                                        enterTo="opacity-100"
                                                        leave="transition duration-75 ease-out"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Menu.Items className="absolute top-0 right-0 bg-white shadow mt-12 rounded w-44 py-2 px-[6px] focus:outline-none">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link href={`/${auth.user._id}`} >
                                                                        <a className={`${active ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-transparent text-gray-600 hover:bg-zinc-200'} rounded w-full text-left font-medium text-sm px-4 py-3 flex flex-row space-x-3 items-center justify-start`}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                            </svg>
                                                                            <span className="block">Profile</span>
                                                                        </a>
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link href={`/${auth.user._id}/posts`} >
                                                                        <a className={`${active ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-transparent text-gray-600 hover:bg-zinc-200'} rounded w-full text-left font-medium text-sm px-4 py-3 flex flex-row space-x-3 items-center justify-start`}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                                                            </svg>
                                                                            <span className="block">My Posts</span>
                                                                        </a>
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link href={`/${auth.user._id}/create-post`} >
                                                                        <a className={`${active ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-transparent text-gray-600 hover:bg-zinc-200'} rounded w-full text-left font-medium text-sm px-4 py-3 flex flex-row space-x-3 items-center justify-start`}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                            </svg>
                                                                            <span className="block">Tambah Posts</span>
                                                                        </a>
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <DropdownButton onClick={handleUserLogout} active={active}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                                        </svg>
                                                                        <span className="block">Keluar</span>
                                                                    </DropdownButton>
                                                                )}
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </li>
                                        ) : (
                                            navbarAuth.map((navAuth) => (
                                                <NavbarAuth key={navAuth.id} navAuth={navAuth} />
                                            ))
                                        )
                                    )
                                }
                            </ul>

                            <div className="block md:hidden">
                                <Menu as={'div'} className="relative">
                                    <Menu.Button className="tracking-wide text-gray-800 px-5 text-sm font-semibold bg-white py-2 rounded flex flex-row items-center space-x-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                                        </svg>
                                    </Menu.Button>
                                    <Transition
                                        enter="transition duration-100 ease-out"
                                        enterFrom="opacity-0 "
                                        enterTo="opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Menu.Items className={`absolute top-0 right-0 bg-white shadow-sm border mt-12 rounded ${auth.user ? 'w-64' : 'w-52'} py-2 px-[6px] focus:outline-none`}>
                                            {
                                                auth.user ? (
                                                    <>
                                                        <Menu.Item>
                                                            <div className="w-full py-3 px-4 flex flex-col items-center justify-center space-y-2">
                                                                <div className="relative overflow-hidden w-16 h-16 rounded-full">
                                                                    <Image src={'/images/img-blog4.png'} alt="image" layout="fill" />
                                                                </div>

                                                                <h5 className="block text-gray-700 text-lg w-11/12 truncate text-center">{auth.user.username}</h5>
                                                            </div>
                                                        </Menu.Item>
                                                        <div className="w-full h-px bg-gray-300 my-1" />
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link href={`/`} >
                                                                    <a className={`${active ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-transparent text-gray-600 hover:bg-zinc-200'} rounded w-full text-left font-medium text-sm px-4 py-3 flex flex-row space-x-3 items-center justify-start`}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                                                        </svg>
                                                                        <span className="block">Home</span>
                                                                    </a>
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link href={`/blogs`} >
                                                                    <a className={`${active ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-transparent text-gray-600 hover:bg-zinc-200'} rounded w-full text-left font-medium text-sm px-4 py-3 flex flex-row space-x-3 items-center justify-start`}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                                        </svg>
                                                                        <span className="block">Blogs</span>
                                                                    </a>
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link href={`/about`} >
                                                                    <a className={`${active ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-transparent text-gray-600 hover:bg-zinc-200'} rounded w-full text-left font-medium text-sm px-4 py-3 flex flex-row space-x-3 items-center justify-start`}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                                                                        </svg>
                                                                        <span className="block">About</span>
                                                                    </a>
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <div className="w-full h-px bg-gray-300 my-1" />
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link href={`/${auth.user._id}`} >
                                                                    <a className={`${active ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-transparent text-gray-600 hover:bg-zinc-200'} rounded w-full text-left font-medium text-sm px-4 py-3 flex flex-row space-x-3 items-center justify-start`}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                        </svg>
                                                                        <span className="block">Profile</span>
                                                                    </a>
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <DropdownButton onClick={handleUserLogout} active={active}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                                                    </svg>
                                                                    <span className="block">My Posts</span>
                                                                </DropdownButton>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <DropdownButton onClick={handleUserLogout} active={active}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                    <span className="block">Tambah Post</span>
                                                                </DropdownButton>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <DropdownButton onClick={handleUserLogout} active={active}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                                    </svg>
                                                                    <span className="block">Keluar</span>
                                                                </DropdownButton>
                                                            )}
                                                        </Menu.Item>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link href={`/`} >
                                                                    <a className={`${active ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-transparent text-gray-600 hover:bg-zinc-200'} rounded w-full text-left font-medium text-sm px-4 py-3 flex flex-row space-x-3 items-center justify-start`}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                                                        </svg>
                                                                        <span className="block">Home</span>
                                                                    </a>
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link href={`/blogs`} >
                                                                    <a className={`${active ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-transparent text-gray-600 hover:bg-zinc-200'} rounded w-full text-left font-medium text-sm px-4 py-3 flex flex-row space-x-3 items-center justify-start`}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                                        </svg>
                                                                        <span className="block">Blogs</span>
                                                                    </a>
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link href={`/about`} >
                                                                    <a className={`${active ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-transparent text-gray-600 hover:bg-zinc-200'} rounded w-full text-left font-medium text-sm px-4 py-3 flex flex-row space-x-3 items-center justify-start`}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                                                                        </svg>
                                                                        <span className="block">About</span>
                                                                    </a>
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <div className="w-full h-px bg-gray-300 my-1" />

                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link href={`/login`} >
                                                                    <a className={`${active ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-transparent text-gray-600 hover:bg-zinc-200'} rounded w-full text-left font-medium text-sm px-4 py-3 flex flex-row space-x-3 items-center justify-start`}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                        </svg>
                                                                        <span className="block">Sign In</span>
                                                                    </a>
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <Link href={`/register`} >
                                                                    <a className={`${active ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-transparent text-gray-600 hover:bg-zinc-200'} rounded w-full text-left font-medium text-sm px-4 py-3 flex flex-row space-x-3 items-center justify-start`}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                                        </svg>
                                                                        <span className="block">Sign Up</span>
                                                                    </a>
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    </>
                                                )
                                            }
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Navbar
