import Link from "next/link"

function ProfilLinkItem({ url, title, icon }) {
    return (
        <>
            <li className="relative block">
                <Link href={url}>
                    <a className="flex flex-row items-center text-gray-600 sm:text-gray-700 justify-start px-4 py-3 sm:py-4 bg-gray-100 rounded-l space-x-1 text-xs sm:text-sm font-medium hover:bg-gray-200">
                        {icon}
                        <span className="hidden sm:block tracking-normal">{title}</span>
                    </a>
                </Link>
            </li>
        </>
    )
}

export default ProfilLinkItem
