import { Menu, Transition } from "@headlessui/react"
import Cookies from "js-cookie"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUserFailure, addUserSuccess, userLogout } from "../action/userAction"
import { navbarAuth, navbarLinks } from "../constant/navbar"
import Container from "./Container"
import DropdownButton from "./DropdownButton"
import NavbarAuth from "./NavbarAuth"
import NavbarItem from "./NavbarItem"

function Navbar() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const router = useRouter();
    const [openDropdown, setOpenDropdown] = useState(false)

    useEffect(() => {

        const userInCookie = Cookies.get('_USR');
        const tokenInCookie = Cookies.get('_TOKEN')
        if (userInCookie && tokenInCookie) {
            dispatch(addUserSuccess(JSON.parse(userInCookie)))
        } else {
            Cookies.remove('_USR')
            Cookies.remove('_TOKEN')
            dispatch(addUserFailure())
        }


    }, [])

    const handleUserLogout = (e) => {
        e.preventDefault()

        router.replace('/login')

        Cookies.remove('_USR')
        Cookies.remove('_TOKEN')

        setTimeout(() => {
            dispatch(userLogout())
        }, 1000)

    }


    return (
        <>
            <div className="w-full h-16 relative bg-blue-500 shadow-md z-50">
                <Container>
                    <div className="flex flex-row items-center justify-between h-full space-x-6">
                        <Link href={'/'}>
                            <a className="flex flex-row items-center justify-center space-x-2">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:h-8 md:w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h1 className="block text-white font-semibold text-lg md:text-xl">Blogger Me</h1>
                            </a>
                        </Link>
                        <div className="grow hidden lg:block">
                            <div className="flex flex-row items-center justify-between bg-white w-8/12 rounded px-3 overflow-hidden">
                                <input type="text" className="w-full focus:outline-none py-2 text-sm pr-3 accent-blue-500" placeholder="Search blog posts" />
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

                            <ul className="flex flex-row items-center justify-center px-4 md:px-6 space-x-4">
                                {
                                    auth.loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        auth.user ? (
                                            <li>
                                                <Menu as={'div'} className="relative">
                                                    <Menu.Button className="bg-transparent tracking-wide text-gray-800 px-5 text-sm font-semibold bg-white py-2 rounded flex flex-row items-center space-x-2">
                                                        <span className="block">{auth.user.username}</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </Menu.Button>
                                                    <Transition
                                                        enter="transition duration-100 ease-out"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="transition duration-75 ease-out"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Menu.Items className="absolute top-0 right-0 bg-white shadow mt-12 rounded w-44 py-2 px-[6px] focus:outline-none">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <DropdownButton onClick={handleUserLogout} active={active}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                        </svg>
                                                                        <span className="block">Profile</span>
                                                                    </DropdownButton>
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
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Navbar
