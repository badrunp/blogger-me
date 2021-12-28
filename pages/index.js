import Image from "next/image";
import Container from "../components/Container";
import Layout from "../components/Layout";
import Button from '../components/Button';
import Link from "next/link";
import { useRouter } from "next/router";
import Avatar from "../components/Avatar";


function Home({ posts, post }) {
  const router = useRouter();

  return (
    <>
      <Layout title={'Home'} className="bg-white">
        <Container className="md:container px-0 md:px-4">
          <div className="w-full md:py-14 space-y-14">

            {
              Object.keys(post).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:px-8 lg:px-14">
                  <div className="md:col-span-3">
                    <div className="relative w-full h-[398px] overflow-hidden">
                      {
                        post.image ? (
                          <Image className="object-cover object-top" src={`${item.image}`} alt="image" layout="fill" />
                        ) : (
                          <div className="w-full h-full bg-zinc-200"></div>
                        )
                      }
                    </div>
                  </div>
                  <div className="md:col-span-2 p-6 md:p-0">
                    <div className="flex flex-col items-start justify-start space-y-3">
                      <div className="flex flex-row items-center space-x-2">
                        <h5 className="block text-sm text-blue-500 font-semibold">Category</h5>
                        <span className="block">-</span>
                        <h5 className="block text-sm text-gray-600">2020-06-12</h5>
                      </div>

                      <Link href={'/blogs/1'}>
                        <a className="block text-3xl font-semibold text-gray-800 w-max hover:underline">Ini adalah judul blog</a>
                      </Link>

                      <p className="block text-sm lg:text-base font-sans tracking-normal leading-7 text-gray-600">Daan ini adalah conetetc blog pos yang saya buat di dala tag p karena menurut saya cocok untuk ukuran text uang seperti ada di dalah text ini</p>

                      <Avatar
                        image={'/images/img-blog3.png'}
                        name="Muhammad Badrun"
                        title={'Software Enginering'}
                      />
                    </div>
                  </div>
                </div>
              )
            }

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-8 lg:px-14">
              {
                posts.length > 0 && posts.map((item, i) => (
                  <div key={i} className="w-full h-auto relative flex flex-col items-start justify-start bg-white shadow rounded overflow-hidden">
                    <div className="h-56 relative overflow-hidden w-full">
                      {
                        item.image ? (
                          <Image className="object-cover object-top" src={`${item.image}`} alt="image" layout="fill" />
                        ) : (
                          <div className="w-full h-full bg-zinc-200"></div>
                        )
                      }
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

                      <Avatar
                        image={'/images/img-blog3.png'}
                        name="Muhammad Badrun"
                        title={'Software Enginering'}
                      />
                    </div>
                  </div>
                ))
              }
            </div>

            {
              posts.length > 0 && (
                <div className="pb-14 md:pb-0 flex flex-row items-center justify-center">
                  <Button onClick={() => router.push('/blogs')} className="bg-blue-500 text-gray-100 tracking-wide font-medium hover:bg-blue-600 focus:ring-2 text-sm focus:ring-blue-300">Lihat semua</Button>
                </div>
              )
            }
          </div>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {

  const request = await fetch('http://localhost:3000/api/blogs?limit=7');
  const response = await request.json();
  const { posts } = response;

  return {
    props: {
      posts: posts.filter((post, i) => i !== 0 && post) || [],
      post: posts.filter((post, i) => i === 0 && post)[0] || {}
    },
    revalidate: 10
  }
}

export default Home;