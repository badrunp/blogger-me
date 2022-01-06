import Skeleton from "./Skeleton"

function ContentSkeleton({ height = 'h-4', className = '' }) {
    return (
        <>
            <div className="flex flex-col items-start space-y-2 w-full">
                <Skeleton className={`w-full ${className} ${height}`} />
                <Skeleton className={`w-8/12 ${className} ${height}`} />
                <Skeleton className={`w-4/12 ${className} ${height}`} />
            </div>
        </>
    )
}

export default ContentSkeleton
