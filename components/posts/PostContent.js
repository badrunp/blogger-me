import dynamic from 'next/dynamic'

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
    ssr: false
})


function PostContent({ content = '', size = 'text-xs', markdown = false, max = 100 }) {
    return (
        <>
        {
            markdown ? (
                <MarkdownPreview  source={content} />
            ) : (
            <p className={`block ${size} text-gray-600`}>
                {content.substring(0,max)}{content.length >= max && '....'}
            </p>
            )
        }
        </>
    )
}

export default PostContent
