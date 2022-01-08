import Link from "next/link"

function PostTitle({ id, title, size = 'text-lg',leading = 'leading-6', redirect = true }) {
    return (
        <>
            {
                redirect ? (
                    <Link href={`/blogs/${id}`}>
                        <a className={`block ${size} font-semibold text-gray-800 hover:underline w-full break-words ${leading}`}>{title}</a>
                    </Link>
                ) : (
                    <h1 className={`block ${size} font-semibold text-gray-800 w-full`}>{title}</h1>
                )
            }
        </>
    )
}

export default PostTitle
