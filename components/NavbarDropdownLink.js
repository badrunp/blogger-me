import { Menu } from '@headlessui/react'
import Link from 'next/link'

function NavbarDropdownLink({ url, icon, title }) {
    return (
        <>
            <Menu.Item>
                {({ active }) => (
                    <Link href={url} >
                        <a className={`${active ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-transparent text-gray-600 hover:bg-zinc-200'} rounded w-full text-left font-medium text-sm px-4 py-3 flex flex-row space-x-3 items-center justify-start`}>
                            {icon}
                            <span className="block">{title}</span>
                        </a>
                    </Link>
                )}
            </Menu.Item>
        </>
    )
}

export default NavbarDropdownLink
