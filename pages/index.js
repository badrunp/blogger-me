import Container from "../components/Container";
import Layout from "../components/Layout";
import ButtonMoreItems from "../components/ButtonMoreItems";
import PostListItem from "../components/posts/PostListItem";
import PostTopNav from "../components/posts/PostTopNav";
import { useSelector } from "react-redux";
import Skeleton from "../components/Skeleton";
import ContentSkeleton from "../components/ContentSkeleton";
import AvatarSkeleton from "../components/AvatarSkeleton";
import PostSkeleton from "../components/posts/PostSkeleton";



function Home() {
  const { posts: posts_home, loading } = useSelector((state) => state.posts)
  const posts = posts_home && posts_home.slice(1, 8) || []
  const post = posts_home && posts_home[0] || {}

  return (
    <>
      <Layout title={'Home'} className="bg-white">
        <Container className="md:container px-0 md:px-4">
          <div className="w-full md:py-14 space-y-14">

            {
              loading ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:px-8 lg:px-14">
                    <div className="md:col-span-3">
                      <div className="relative w-full h-[398px] overflow-hidden">
                        <Skeleton className={'w-full h-full'} />
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6 md:p-0">
                      <div className="flex flex-col items-start justify-start space-y-3">


                        <div className="flex flex-row items-start space-x-2 w-full">
                          <Skeleton className={`w-1/3 h-3 lg:h-4`} />
                          <Skeleton className={`w-1/5 h-3 lg:h-4`} />
                        </div>

                        <ContentSkeleton />

                        <AvatarSkeleton />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-0 grid grid-cols-1 space-y-4 sm:space-y-0 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <PostSkeleton image="h-64" />
                    <PostSkeleton image="h-64" />
                    <PostSkeleton image="h-64" />
                  </div>
                </>
              ) : (
                <>
                  {
                    Object.keys(post).length > 0 && (
                      <PostTopNav
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        content={post.summary}
                        category={post.category}
                        time={post.createdAt}
                        image={post.image}
                        author={post.author}
                      />
                    )
                  }

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-8 lg:px-14">
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

            <ButtonMoreItems posts={posts} />
          </div>
        </Container>
      </Layout>
    </>
  )
}


export default Home;