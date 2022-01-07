import Head from "next/head"
import Logo from "./Logo"

function GuestLayout({ children, title = 'Sign In' }) {
    return (
        <>
            <Head>
                <title>Auth | {title}</title>
            </Head>

            <div className="font-sans w-full min-h-screen bg-white flex flex-col justify-center items-center py-10">
                <Logo className="md:mb-6 pb-2 relative z-10 bg-gradient-to-br from-blue-400 to-blue-800 bg-clip-text" textStyle="text-2xl text-transparent" iconStyle="w-8 h-8 text-blue-600" />
                <div className="w-full md:w-4/6 lg:w-3/6 xl:w-2/5 bg-white md:ring-1 ring-gray-300 flex-none md:mx-auto md:rounded-lg md:shadow px-10 py-10">
                    {children}
                </div>
            </div>
        </>
    )
}

export default GuestLayout
