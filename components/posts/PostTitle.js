import Link from "next/link"

function PostTitle({ id, title, size = 'text-lg', redirect = true }) {
    return (
        <>
            {
                redirect ? (
                    <Link href={`/blogs/${id}`}>
                        <a className={`block ${size} font-semibold text-gray-800 hover:underline w-full break-words leading-6`}>{title}</a>
                    </Link>
                ) : (
                    <h1 className={`block ${size} font-semibold text-gray-800 w-max break-words`}>{title}</h1>
                )
            }
        </>
    )
}

export default PostTitle
