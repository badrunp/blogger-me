import Head from "next/head"

function GuestLayout({ children, title = 'Sign In' }) {
    return (
        <>
            <Head>
                <title>Auth | {title}</title>
            </Head>

            <div className="w-full min-h-screen bg-gray-100 flex flex-row justify-center items-center">
                <div className="w-2/5 bg-white flex-none mx-auto rounded-lg shadow px-8 py-8">
                    {children}
                </div>
            </div>
        </>
    )
}

export default GuestLayout
