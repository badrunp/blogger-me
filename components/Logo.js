import Link from 'next/link'

function Logo({ color = 'text-gray-700' }) {
    return (
        <>
            <Link href={'/'}>
                <a className={`flex ${color} flex-row items-center justify-center space-x-2`}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:h-8 md:w-8 md:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <h1 className="block md:text-white font-semibold text-lg md:text-xl">Blogger Me</h1>
                </a>
            </Link>
        </>
    )
}

export default Logo
