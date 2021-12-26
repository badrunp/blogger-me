import Head from "next/head"
import Navbar from "../components/Navbar"
import Footer from "./Footer"

function Layout({ children, title = 'Home', className="" }) {
    return (
        <>
            <Head>
                <title>Blog Post | {title}</title>
            </Head>


            <Navbar />

            <div className={className}>
                {children}
            </div>

            <Footer />
        </>
    )
}

export default Layout
