import Skeleton from "../Skeleton"

function PostSkeleton() {
    return (
        <>
            <div className="flex flex-col items-start justify-start space-y-4">
                <Skeleton className="w-full h-44" />
                <div className="flex flex-row items-start space-x-2 w-full">
                    <Skeleton className={'w-3/12 h-3'} />
                    <Skeleton className={'w-2/12 h-3'} />
                </div>
                <div className="flex flex-col items-start space-y-2 w-full">
                    <Skeleton className={'w-full h-4'} />
                    <Skeleton className={'w-8/12 h-4'} />
                    <Skeleton className={'w-4/12 h-4'} />
                </div>
                <div className="flex flex-row w-full space-x-3 items-center">
                    <Skeleton className={'w-10 h-10 rounded-full flex-shrink-0'} />
                    <div className="flex flex-col w-full space-y-2">
                        <Skeleton className={'w-6/12 h-3'} />
                        <Skeleton className={'w-4/12 h-3'} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostSkeleton
