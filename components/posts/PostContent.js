
function PostContent({ content = '', size = 'text-xs' }) {
    return (
        <>
            <p className={`block ${size} text-gray-600`}>
                {content}
            </p>
        </>
    )
}

export default PostContent
