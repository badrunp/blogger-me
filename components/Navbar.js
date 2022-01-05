import { Menu } from "@headlessui/react"
import Cookies from "js-cookie"
import Image from 'next/image'
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userIsLogin, userLogout } from "../action/userAction"
import { navbarAuth, navbarDropdownMenuLinksAuthMd, navbarDropdownMenuLinksAuthMobile, navbarDropdownMenuLinksGuestMd, navbarLinks } from "../constant/navbar"
import Container from "./Container"
import DropdownButton from "./DropdownButton"
import NavbarAuth from "./NavbarAuth"
import NavbarItem from "./NavbarItem"
import { profileConstant } from "../constant/redux"
import Logo from './Logo'
import NavbarSearch from "./NavbarSearch"
import NavbarDropdownLink from "./NavbarDropdownLink"
import Dropdown from "./Dropdown"
import { getPostHome } from "../action/postAction"

function Navbar() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const [showSearch, setShowSearch] = useState(false)
    const router = useRouter();
    const { posts, loading } = useSelector((state) => state.posts)


    useEffect(() => {
        if (posts.length === 0 || loading) {
            dispatch(getPostHome())
        }
    }, [])

    useEffect(() => {

        dispatch(userIsLogin())

    }, [])

    const handleUserLogout = (e) => {
        e.preventDefault()

        router.replace('/')

        Cookies.remove('_TOKEN')

        setTimeout(() => {
            dispatch(userLogout())
            dispatch({ type: profileConstant.RESET_PROFILE })
        }, 1000)

    }


    return (
        <>
            <div className="w-full h-16 relative border-b md:border-none border-gray-200 bg-white md:bg-blue-500  md:shadow-md z-50">
                <Container>
                    <div className="flex flex-row items-center justify-between h-full space-x-6">
                        <Logo />

                        <NavbarSearch active={showSearch} closeSearch={setShowSearch} />


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
                                                <Dropdown
                                                    title={<>
                                                        <div className="w-7 h-7 bg-gray-200 rounded-full overflow-hidden relative flex-none mr-1">
                                                            <Image src={'/images/man.png'} alt="image" layout="fill" />
                                                        </div>
                                                        <span className="block truncate max-w-[128px]">{auth.user.username}</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    </>}

                                                >
                                                    {
                                                        navbarDropdownMenuLinksAuthMd.map(item => (
                                                            <NavbarDropdownLink
                                                                key={item.id}
                                                                url={`/${auth.user._id}${item.link}`}
                                                                icon={item.icon}
                                                                title={item.title}
                                                            />
                                                        ))
                                                    }
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
                                                </Dropdown>

                                            </li>
                                        ) : (
                                            navbarAuth.map((navAuth) => (
                                                <NavbarAuth key={navAuth.id} navAuth={navAuth} />
                                            ))
                                        )
                                    )
                                }
                            </ul>

                            <div className="block md:hidden mr-2">
                                <button className="h-full flex items-center cursor-pointer focus:outline-none" onClick={() => setShowSearch(!showSearch)}>
                                    {
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    }
                                </button>
                            </div>

                            <div className="block md:hidden">
                                <Dropdown title={

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                                    </svg>
                                }
                                    className={`${auth.user ? 'w-64' : 'w-52'}`}>
                                    {
                                        auth.user ? (
                                            <>
                                                <Menu.Item>
                                                    <div className="w-full py-3 px-4 flex flex-col items-center justify-center space-y-2">
                                                        <div className="relative overflow-hidden w-16 h-16 rounded-full">
                                                            <Image src={'/images/man.png'} alt="image" layout="fill" />
                                                        </div>

                                                        <h5 className="block text-gray-700 text-lg w-11/12 truncate text-center">{auth.user.username}</h5>
                                                    </div>
                                                </Menu.Item>
                                                <div className="w-full h-px bg-gray-300 my-1" />
                                                {
                                                    navbarDropdownMenuLinksAuthMobile.map((item, i) => (
                                                        <Fragment key={item.id}>
                                                            <NavbarDropdownLink
                                                                url={`${item.id > 2 ? `/${auth.user._id}` : ''}${item.link}`}
                                                                icon={item.icon}
                                                                title={item.title}
                                                            />
                                                            {i == 1 && (<div className="w-full border-t mt-1 border-gray-300 h-1" />)}
                                                        </Fragment>
                                                    ))
                                                }
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
                                                {
                                                    navbarDropdownMenuLinksGuestMd.map(item => (
                                                        <NavbarDropdownLink
                                                            key={item.id}
                                                            url={`${item.link}`}
                                                            icon={item.icon}
                                                            title={item.title}
                                                        />
                                                    ))
                                                }

                                            </>
                                        )
                                    }

                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Navbar
