import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Avatar from "../../components/Avatar"
import Container from "../../components/Container"
import Layout from "../../components/Layout"
import PostCategoryAndTime from "../../components/posts/PostCategoryAndTime"
import PostContent from "../../components/posts/PostContent"
import PostImage from "../../components/posts/PostImage"
import PostListItem from "../../components/posts/PostListItem"
import PostTitle from "../../components/posts/PostTitle"

function DetailBlog() {
    const { query: { id } } = useRouter()
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (id) {
            setLoading(true)
            async function getData() {
                try {
                    const request = await fetch(`/api/blogs/${id}/id`)
                    const { post } = await request.json();

                    setPost(post)
                    setLoading(false)

                } catch (error) {
                    console.log(error);
                }
            }

            getData()
        }

    }, [id])

    return (
        <>
            <Layout title="Detail Blog" className="bg-white">
                <Container>
                    <div className="w-full py-8 md:py-14">
                        <div className="grid grid-cols-1 xl:grid-cols-6 md:px-8">
                            <div className="md:col-span-5 xl:pr-8 space-y-8">
                                {
                                   !post && loading ? (
                                        <p>Loading..</p>
                                    ) : (
                                        <>
                                            <Avatar
                                                image={'/images/img-blog4.png'}
                                                name={post?.author?.username}
                                                title={post?.author?.title}
                                            />

                                            <div className="relative w-full h-80 lg:h-[488px] overflow-hidden">
                                                <PostImage image={post.image} />
                                            </div>

                                            <PostCategoryAndTime
                                                category={post.category}
                                                time={post.createdAt}
                                                size="text-base"
                                            />

                                            <div className="flex flex-col items-start justify-start space-y-2">
                                                <PostTitle title={post.title} size="text-3xl" redirect={false} />

                                                <PostContent content={post.summary} markdown={true} />

                                            </div>
                                        </>
                                    )
                                }

                            </div>
                            {/* <div className="md:col-span-1 mt-9 md:mt-0 md:pt-[83px]">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-1 gap-6 lg:ga-8 ">
                                    {
                                        posts && posts.map((item) => {
                                            if (item._id != post._id) {
                                                return (
                                                    <PostListItem
                                                        key={item._id}
                                                        id={item._id}
                                                        title={item.title}
                                                        summary={item.summary}
                                                        category={item.category}
                                                        time={item.createdAt}
                                                        image={item.image}
                                                        avatar={false}
                                                        imageSize="aspect-video"
                                                    />
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div> */}
                        </div>
                    </div>
                </Container>
            </Layout>
        </>
    )
}

export default DetailBlog
