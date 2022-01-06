import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
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

    const { posts: posts_1 } = useSelector((state) => state.posts)
    const { blog_posts: { data: posts_2 } } = useSelector(state => state.posts)
    const { posts: { data: posts_3 } } = useSelector(state => state.profile)
    const postsList = [...posts_1, ...posts_2, ...posts_3] || []

    const [post, setPost] = useState({})
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [loadingPosts, setLoadingPosts] = useState(true)

    useEffect(() => {

        if (id) {
            if (postsList.some(item => item._id === id)) {
                setPost(postsList.find(item => item._id === id))
                setLoading(false)
            } else {
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
        }

    }, [id, postsList])

    useEffect(() => {

        if (post && post.author && id) {
            async function getRelatedPost() {
                const request = await fetch('/api/blogs/author/' + post.author?._id + '?expect=' + id + '&limit=3')
                const response = await request.json()

                setPosts(response.posts)
                setLoadingPosts(false)
            }

            getRelatedPost();
        }
    }, [post, id])

    return (
        <>
            <Layout title="Detail Blog" className="bg-white">
                <Container>
                    <div className="w-full py-8 md:py-14">
                        <div className="grid grid-cols-1 xl:grid-cols-6 md:px-8">
                            <div className="md:col-span-5 xl:pr-8 space-y-8">

                                {
                                    !post || loading ? (
                                        <AvatarSkeleton className="mt-2" />
                                    ) : (
                                        <Avatar
                                            image={'/images/img-blog4.png'}
                                            name={post?.author?.username}
                                            title={post?.author?.title}
                                            id={post?.author?._id}
                                        />
                                    )
                                }

                                <div className="relative w-full h-80 lg:h-[488px] overflow-hidden">
                                    {
                                        !post || loading ? (
                                            <Skeleton className={'w-full h-full skeleton-1'} />
                                        ) : (
                                            <PostImage image={post.image} />
                                        )
                                    }
                                </div>

                                {
                                    !post || loading ? (
                                        <ContentSkeleton className="skeleton-1" />
                                    ) : (
                                        <>
                                            <PostCategoryAndTime
                                                category={post.category}
                                                time={post.createdAt}
                                                size="text-base"
                                            />

                                            <div className="flex flex-col items-start justify-start space-y-6">
                                                <PostTitle title={post.title} size="text-3xl" redirect={false} />

                                                <PostContent content={post.content} markdown={true} />

                                            </div>
                                        </>
                                    )
                                }


                            </div>
                            <div className="md:col-span-1 mt-9 md:mt-0 md:pt-[79px]">
                                {
                                    loadingPosts ? (
                                        <Skeleton className={'w-1/3 xl:w-full h-5 skeleton-1'} />
                                    ) : (
                                        posts && posts.length > 0 && (
                                            <h3 className="text-gray-700 text-lg font-semibold border-b pb-2 w-max border-gray-300 xl:w-full font-sans -mt-2">Terbaru dari {post?.author?.username}</h3>
                                        )
                                    )
                                }
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-1 gap-6 lg:ga-8 mt-6">
                                    {
                                        loadingPosts ? (
                                            [...Array(3)].map((data, i) => (
                                                <PostSkeleton key={i} avatar={false} image="h-[140px]" heightTitle="h-2" heightContent="h-3" />
                                            ))
                                        ) : (
                                            posts && posts.map((item) => (
                                                <PostListItem
                                                    key={item._id}
                                                    id={item._id}
                                                    title={item.title}
                                                    summary={item.summary}
                                                    category={item.category}
                                                    time={item.createdAt}
                                                    image={item.image}
                                                    avatar={false}
                                                    imageSize="h-[220px] xl:h-[140px]"
                                                />
                                            ))
                                        )
                                    }
                                </div>

                                {
                                    post && posts && posts.length > 0 && (
                                        <div className="w-full flex justify-center xl:justify-end mt-6">
                                            <Link href={`/${post.author._id}/posts`}>
                                                <a className="text-blue-500 text-sm hover:text-blue-600 font-semibold">Lihat lainya</a>
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </Container>
            </Layout>
        </>
    )
}

export default DetailBlog
