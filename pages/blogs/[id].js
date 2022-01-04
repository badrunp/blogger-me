import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Avatar from "../../components/Avatar"
import AvatarSkeleton from "../../components/AvatarSkeleton"
import Container from "../../components/Container"
import ContentSkeleton from "../../components/ContentSkeleton"
import Layout from "../../components/Layout"
import PostCategoryAndTime from "../../components/posts/PostCategoryAndTime"
import PostContent from "../../components/posts/PostContent"
import PostImage from "../../components/posts/PostImage"
import PostListItem from "../../components/posts/PostListItem"
import PostSkeleton from "../../components/posts/PostSkeleton"
import PostTitle from "../../components/posts/PostTitle"
import Skeleton from "../../components/Skeleton"

function DetailBlog() {
    const { query: { id } } = useRouter()
    const { posts: posts_category, loading: loadingPosts } = useSelector((state) => state.posts)
    const posts = posts_category.filter(item => item._id != id) || []
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
                    setLoading(false)
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
                                    !post || loading ? (
                                        <AvatarSkeleton />
                                    ) : (
                                        <Avatar
                                            image={'/images/img-blog4.png'}
                                            name={post?.author?.username}
                                            title={post?.author?.title}
                                        />
                                    )
                                }

                                <div className="relative w-full h-80 lg:h-[488px] overflow-hidden">
                                    {
                                        !post || loading ? (
                                            <Skeleton className={'w-full h-full'} />
                                        ) : (
                                            <PostImage image={post.image} />
                                        )
                                    }
                                </div>

                                {
                                    !post || loading ? (
                                        <ContentSkeleton />
                                    ) : (
                                        <>
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
                            <div className="md:col-span-1 mt-9 md:mt-0 md:pt-[83px]">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-6 lg:ga-8 ">
                                    {
                                        loadingPosts ? (
                                            <PostSkeleton avatar={false} image="aspect-video" heightTitle="h-2" heightContent="h-3" />
                                        ) : (
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
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Layout>
        </>
    )
}

export default DetailBlog
