import Skeleton from "./Skeleton"

function ContentSkeleton({ height = 'h-4' }) {
    return (
        <>
            <div className="flex flex-col items-start space-y-2 w-full">
                <Skeleton className={`w-full ${height}`} />
                <Skeleton className={`w-8/12 ${height}`} />
                <Skeleton className={`w-4/12 ${height}`} />
            </div>
        </>
    )
}

export default ContentSkeleton
