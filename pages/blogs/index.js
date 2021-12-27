import Container from "../../components/Container"
import Layout from "../../components/Layout"
import Image from 'next/image'
import Link from "next/link"

function blogs() {
    return (
        <>
            <Layout title="Blogs">
                <Container className="md:container px-0 md:px-4">
                    <div className="w-full py-8 sm:py-14 flex flex-col items-strart justify-start space-y-6 md:space-y-14 px-6 md:px-8 lg:px-12">
                        <div className="text-left">
                            <h1 className="block text-2xl md:text-4xl text-gray-700 font-bold font-sans">All Posts</h1>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                [3, 4, 5, 3, 4, 5].map((item, i) => (
                                    <div key={i} className="w-full h-auto relative flex flex-col items-start justify-start bg-white shadow rounded">
                                        <div className="h-60 relative overflow-hidden w-full">
                                            <Image className="object-cover object-top" src={`/images/img-blog${item}.png`} alt="image" layout="fill" />
                                        </div>
                                        <div className="p-4 flex flex-col space-y-2">
                                            <div className="flex flex-row items-center space-x-2">
                                                <h5 className="block text-xs tracing-tight text-blue-500 font-semibold">Category</h5>
                                                <span className="block">-</span>
                                                <h5 className="block text-xs text-gray-600 tracing-tight">2020-06-12</h5>
                                            </div>

                                            <Link href={'/blogs/1'}>
                                                <a className="blocktext-lg font-semibold text-gray-800 hover:underline w-max">Ini adalah judul blog</a>
                                            </Link>

                                            <p className="block text-xs text-gray-600">Daan ini adalah conetetc blog pos yang saya buat di dala tag p karena menurut saya cocok untuk ukuran text uang seperti ada di dalah text ini</p>

                                            <div className="flex flex-row items-center justify-start space-x-2 pt-2">
                                                <div className="w-10 h-10 bg-blue-500 rounded-full overflow-hidden relative">
                                                    <Image src={'/images/img-blog3.png'} alt="image" layout="fill" />
                                                </div>

                                                <h5 className="block text-gray-800 font-semibold text-sm font-sans">Muhammad Badrun</h5>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Container>
            </Layout>
        </>
    )
}

export default blogs
