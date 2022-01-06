import { parseDate } from '../../lib/string'

function PostCategoryAndTime({ category = '', time = '', size = "text-xs"  }) {
    return (
        <>
            <div className="flex flex-row items-center space-x-2">
                <h5 className={`block ${size} tracing-tight text-blue-500 font-semibold`}>{category}</h5>
                <span className="block">-</span>
                <h5 className={`block ${size} text-gray-600 tracing-tight`}>{parseDate(time)}</h5>
            </div>
        </>
    )
}

export default PostCategoryAndTime
