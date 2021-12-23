import Link from "next/link"

function FooterPageMenu({
    footerLink: {
        label,
        link
    }
}) {
    return (
        <>
            <li className="relative">
                <Link href={link}>
                    <a className="block text-gray-400 text-sm font-medium hover:text-white">{label}</a>
                </Link>
            </li>
        </>
    )
}

export default FooterPageMenu
