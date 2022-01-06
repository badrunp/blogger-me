import AvatarSkeleton from "../AvatarSkeleton"
import ContentSkeleton from "../ContentSkeleton"
import Skeleton from "../Skeleton"

function PostSkeleton({ avatar = true, image = 'h-44', heightTitle = 'h-3', heightContent = 'h-4', className ='' }) {
    return (
        <>
            <div className={`flex ${className} flex-col items-start justify-start space-y-4`}>
                <Skeleton className={`w-full ${image} skeleton-1`} />
                <div className="flex flex-row items-start space-x-2 w-full">
                    <Skeleton className={`w-3/12 ${heightTitle} skeleton-1`} />
                    <Skeleton className={`w-2/12 ${heightTitle} skeleton-2`} />
                </div>
                <ContentSkeleton height={heightContent} className="skeleton-1" />
                {
                    avatar && (
                        <AvatarSkeleton />
                    )
                }
            </div>
        </>
    )
}

export default PostSkeleton
