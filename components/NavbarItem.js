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
                    <a className="block text-white hover:text-black transition-all font-medium duration-150 ease-in-out text-sm tracking-wide">{label}</a>
               </Link>
           </li>
        </>
    )
}

export default NavbarItem
