import { useSelector } from "react-redux";
import BlogTitle from "../../components/BlogTitle";
import Container from "../../components/Container"
import Layout from "../../components/Layout"
import PostListItem from "../../components/posts/PostListItem"
import PostSkeleton from "../../components/posts/PostSkeleton";

function Blogs() {
    const { posts, loading } = useSelector((state) => state.posts)
    return (
        <>
            <Layout title="Blogs">
                <Container className="md:container px-0 md:px-4">
                    <div className="w-full py-8 sm:py-14 flex flex-col items-strart justify-start space-y-6 md:space-y-14 px-6 md:px-8 lg:px-12">
                        {
                            loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 space-y-4 md:space-y-0 gap-6">
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
                                                />
                                            ))
                                        }
                                    </div>
                                </>
                            )
                        }
                    </div>
                </Container>
            </Layout>
        </>
    )
}

export default Blogs
