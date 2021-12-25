import Head from "next/head"

function GuestLayout({ children, title = 'Sign In' }) {
    return (
        <>
            <Head>
                <title>Auth | {title}</title>
            </Head>

            <div className="font-sans w-full min-h-screen bg-white md:bg-gray-200 flex flex-row justify-center items-center">
                <div className="w-full md:w-4/6 lg:w-3/6 xl:w-2/5 bg-white flex-none md:mx-auto md:rounded-lg md:shadow px-10 py-10">
                    {children}
                </div>
            </div>
        </>
    )
}

export default GuestLayout
