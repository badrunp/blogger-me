import Container from "../components/Container";
import Layout from "../components/Layout";
import ButtonMoreItems from "../components/ButtonMoreItems";
import PostListItem from "../components/posts/PostListItem";
import PostTopNav from "../components/posts/PostTopNav";



function Home(props) {
  const post = props.posts[0]
  const posts = props.posts.slice(1)

  return (
    <>
      <Layout title={'Home'} className="bg-white">
        <Container className="md:container px-0 md:px-4">
          <div className="w-full md:py-14 space-y-14">

            {
              Object.keys(post).length > 0 && (
                <PostTopNav
                  key={post._id}
                  id={post._id}
                  title={post.title}
                  content={post.content}
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
                    content={item.content}
                    category={item.category}
                    time={item.createdAt}
                    image={item.image}
                    author={item.author}
                  />
                ))
              }
            </div>

            <ButtonMoreItems posts={posts} />
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
      posts: posts
    }
  }
}

export default Home;