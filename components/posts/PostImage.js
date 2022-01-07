import Image from "next/image"

function PostImage({ image }) {
    return (
        <>
            {
                image ? (
                    <Image className="object-cover object-top" src={`${image}`} alt="image" layout="fill" />
                ) : (
                    <div className="w-full h-full bg-zinc-200 relative">
                        <Image className="object-cover" src={'/images/default-blog-image.jpg'} alt="default blog image" layout="fill" />
                    </div>
                )
            }
        </>
    )
}

export default PostImage
