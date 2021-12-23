import Link from "next/link"

function NavbarAuth({
    navAuth: {
        label,
        link
    }
}) {
    return (
        <>
            <li className="relative">
                <Link href={link}>
                    <a className={`block px-4 uppercase tracking-wide py-2 text-xs font-medium border border-transparent rounded transition ease-in-out duration-300 ${link == '/login' ? 'bg-white text-blue-600 hover:bg-transparent hover:text-white hover:border-white' : 'bg-transparent border-white text-white hover:bg-black hover:text-white hover:border-black'}`}>{label}</a>
                </Link>
            </li>
        </>
    )
}

export default NavbarAuth
