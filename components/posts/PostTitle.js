import Link from "next/link"

function PostTitle({ id, title, size = 'text-lg', redirect = true }) {
    return (
        <>
            {
                redirect ? (
                    <Link href={`/blogs/${id}`}>
                        <a className={`block ${size} font-semibold text-gray-800 hover:underline w-max`}>{title}</a>
                    </Link>
                ) : (
                    <h1 className={`block ${size} font-semibold text-gray-800 w-max`}>{title}</h1>
                )
            }
        </>
    )
}

export default PostTitle
