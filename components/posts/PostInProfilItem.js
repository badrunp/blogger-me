import PostListItem from "./PostListItem"
import PostSkeleton from "./PostSkeleton"

function PostInProfilItem({ loadingPost, data, edited = false }) {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
                {
                    loadingPost ? (
                        [1, 2, 3].map((i) => (
                            <PostSkeleton key={i} />
                        ))
                    ) : (
                        data.length > 0 ? (
                            data.map(item => (
                                <PostListItem
                                    key={item._id}
                                    id={item._id}
                                    title={item.title}
                                    content={item.content}
                                    category={item.category}
                                    time={item.createdAt}
                                    image={item.image}
                                    imageSize="h-44"
                                    edited={edited}
                                />
                            ))
                        ) : (
                            <p className="block text-gray-700  text-sm">Tidak ada post!</p>
                        )
                    )
                }
            </div>
        </>
    )
}

export default PostInProfilItem
