import Head from "next/head"
import Navbar from "../components/Navbar"
import Footer from "./Footer"

function Layout({ children, title = 'Home'}) {
    return (
        <>
            <Head>
                <title>Blog Post | {title}</title>
            </Head>

            <div className="antialiased tracking-tight">
                <Navbar />

                {children}

                <Footer/>
            </div>
        </>
    )
}

export default Layout
