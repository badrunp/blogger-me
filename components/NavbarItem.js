import Link from "next/link"

function NavbarItem({ 
    navItem: {
        label,
        link
    }
 }) {
    return (
        <>
           <li className="relative">
               <Link href={link}>
                    <a className="block text-gray-50 font-medium hover:text-gray-800 transition-all duration-150 ease-in-out text-base tracking-tight">{label}</a>
               </Link>
           </li>
        </>
    )
}

export default NavbarItem
