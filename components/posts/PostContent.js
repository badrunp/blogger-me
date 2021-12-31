import dynamic from 'next/dynamic'

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
    ssr: false
})


function PostContent({ content = '', size = 'text-xs', markdown = false }) {
    return (
        <>
        {
            markdown ? (
                <MarkdownPreview  source={content} />
            ) : (
            <p className={`block ${size} text-gray-600`}>
                {content}
            </p>
            )
        }
        </>
    )
}

export default PostContent
