import Link from 'next/link'

function Logo({ color = 'text-gray-700', className = '', textStyle = 'text-lg md:text-xl', iconStyle = 'w-6 h-6 md:h-8 md:w-8' }) {
    return (
        <>
            <Link href={'/'}>
                <a className={`flex ${color} ${className} flex-row items-center justify-center space-x-2`}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={iconStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <h1 className={`block ${textStyle} font-semibold`}>Blogger Me</h1>
                </a>
            </Link>
        </>
    )
}

export default Logo
