import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostBlog } from "../../action/postAction";
import BlogTitle from "../../components/BlogTitle";
import Button from "../../components/Button";
import Container from "../../components/Container"
import Layout from "../../components/Layout"
import PostListItem from "../../components/posts/PostListItem"
import PostSkeleton from "../../components/posts/PostSkeleton";
import { postConstant } from "../../constant/redux";

function Blogs() {

    const dispatch = useDispatch()
    const { count, blog_posts: { loading, data: posts, skip } } = useSelector(state => state.posts)
    const [isLoad, setIsLoad] = useState(false)

    useEffect(() => {

        if(loading){
            dispatch(getPostBlog())
        }

    }, [])

    const handleLoadPosts = async (e) => {
        e.preventDefault()

        let limit = 3;
        setIsLoad(true)
        const { success, count } = await dispatch(getPostBlog(skip, limit))
        if (success) {
            dispatch({ type: postConstant.UPDATE_SKIP_POST, payload: { skip: skip + limit } })
            dispatch({ type: postConstant.UPDATE_COUNT_POST, payload: { count } })
            setIsLoad(false)
        } else {
            setIsLoad(false)
        }

    }

    return (
        <>
            <Layout title="Blogs">
                <Container className="md:container px-0 md:px-4">
                    <div className="w-full py-8 sm:py-14 flex flex-col space-y-6 md:space-y-14 px-6 md:px-8 lg:px-12">
                        {
                            loading && !isLoad ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <PostSkeleton image="h-64" />
                                    <PostSkeleton image="h-64" />
                                    <PostSkeleton image="h-64" />
                                </div>
                            ) : (
                                <>
                                    {
                                        posts.length > 0 && (
                                            <BlogTitle
                                                title="All Posts"
                                            />
                                        )
                                    }
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {
                                            posts.length > 0 && posts.map((item) => (
                                                <PostListItem
                                                    key={item._id}
                                                    id={item._id}
                                                    title={item.title}
                                                    summary={item.summary}
                                                    category={item.category}
                                                    time={item.createdAt}
                                                    image={item.image}
                                                    author={item.author}
                                                    max={150}
                                                />
                                            ))
                                        }

                                    </div>
                                    {
                                        isLoad && loading && (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                                <PostSkeleton image="h-64" />
                                                <PostSkeleton image="h-64" />
                                                <PostSkeleton image="h-64" />
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                    {
                        posts.length > 0 && count == 3 && (
                            <Button onClick={handleLoadPosts} className="primary mx-auto">Selanjutnya</Button>
                        )
                    }
                    </div>
                </Container>
            </Layout>
        </>
    )
}

export default Blogs
