import Avatar from "../Avatar"
import PostCategoryAndTime from "./PostCategoryAndTime"
import PostContent from "./PostContent"
import PostImage from "./PostImage"
import PostTitle from "./PostTitle"

function PostListItem({
    id,
    title,
    content,
    category,
    image,
    time,
    avatar = true,
    imageSize = 'h-64'
}) {
    return (
        <>
            <div className="w-full h-auto relative flex flex-col items-start justify-start bg-white shadow rounded overflow-hidden">
                <div className={`${imageSize} relative overflow-hidden w-full`}>
                    <PostImage image={image} />
                </div>
                <div className="p-4 flex flex-col space-y-2">
                    <PostCategoryAndTime
                        category={category}
                        time={time}
                    />

                    <PostTitle
                        id={id}
                        title={title}
                    />

                    <PostContent
                        content={content}
                    />

                    {
                        avatar && (
                            <Avatar
                                image={'/images/img-blog3.png'}
                                name="Muhammad Badrun"
                                title={'Software Enginering'}
                            />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default PostListItem
