import Link from "next/link"

function PostTitle({ id, title, size = 'text-lg' }) {
    return (
        <>
            <Link href={`/blogs/${id}`}>
                <a className={`block ${size} font-semibold text-gray-800 hover:underline w-ma`}>{title}</a>
            </Link>
        </>
    )
}

export default PostTitle
