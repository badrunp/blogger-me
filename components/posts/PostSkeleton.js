import AvatarSkeleton from "../AvatarSkeleton"
import ContentSkeleton from "../ContentSkeleton"
import Skeleton from "../Skeleton"

function PostSkeleton({ avatar = true, image = 'h-44', heightTitle = 'h-3', heightContent = 'h-4' }) {
    return (
        <>
            <div className="flex flex-col items-start justify-start space-y-4">
                <Skeleton className={`w-full ${image}`} />
                <div className="flex flex-row items-start space-x-2 w-full">
                    <Skeleton className={`w-3/12 ${heightTitle}`} />
                    <Skeleton className={`w-2/12 ${heightTitle}`} />
                </div>
                <ContentSkeleton height={heightContent} />
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
