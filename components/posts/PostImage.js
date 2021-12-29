import React from 'react'

function PostImage({ image }) {
    return (
        <>
            {
                image ? (
                    <Image className="object-cover object-top" src={`${image}`} alt="image" layout="fill" />
                ) : (
                    <div className="w-full h-full bg-zinc-200"></div>
                )
            }
        </>
    )
}

export default PostImage
