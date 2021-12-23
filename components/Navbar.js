import Link from "next/link"
import { navbarAuth, navbarLinks } from "../constant/navbar"
import Container from "./Container"
import NavbarAuth from "./NavbarAuth"
import NavbarItem from "./NavbarItem"

function Navbar() {
    return (
        <>
            <div className="w-full h-16 relative bg-blue-500 shadow-md overflow-x-hidden">
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
                        <div className="grow">
                            <div className="flex flex-row items-center justify-between bg-white w-8/12 rounded px-3 overflow-hidden">
                                <input type="text" className="w-full focus:outline-none py-2 text-sm pr-3 accent-blue-500" placeholder="Search title of blogs posts" />
                                <div className="block overflow-hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-center divide-x divide-gray-200">
                            <ul className="flex flex-row items-center justify-center px-4 md:px-6 space-x-6">
                                {
                                    navbarLinks &&
                                    navbarLinks.map((navItem) => (
                                        <NavbarItem key={navItem.id} navItem={navItem} />
                                    ))

                                }
                            </ul>

                            <ul className="flex flex-row items-center justify-center px-4 md:px-6 space-x-4">
                                {
                                    navbarAuth &&
                                    navbarAuth.map((navAuth) => (
                                        <NavbarAuth key={navAuth.id} navAuth={navAuth} />
                                    ))
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
