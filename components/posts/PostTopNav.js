import React from 'react'
import Avatar from '../Avatar'
import PostCategoryAndTime from './PostCategoryAndTime'
import PostContent from './PostContent'
import PostImage from './PostImage'
import PostTitle from './PostTitle'

function PostTopNav({
    id,
    title,
    content,
    category,
    image,
    time,
}) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:px-8 lg:px-14">
                <div className="md:col-span-3">
                    <div className="relative w-full h-[398px] overflow-hidden">
                        <PostImage image={image} />
                    </div>
                </div>
                <div className="md:col-span-2 p-6 md:p-0">
                    <div className="flex flex-col items-start justify-start space-y-3">
                        <PostCategoryAndTime
                            time={time}
                            category={category}
                            size="text-sm"
                        />

                        <PostTitle
                            id={id}
                            title={title}
                            size="text-3xl"
                        />

                        <PostContent
                            content={content}
                            size="text-sm"
                        />

                        <Avatar
                            image={'/images/img-blog3.png'}
                            name="Muhammad Badrun"
                            title={'Software Enginering'}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostTopNav
