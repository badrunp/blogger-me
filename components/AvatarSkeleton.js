import Skeleton from './Skeleton'

function AvatarSkeleton() {
    return (
        <>
            <div className="flex flex-row w-full space-x-3 items-center">
                <div className={'w-10 h-10 rounded-full flex-shrink-0 bg-zinc-200 animate-pulse'} />
                <div className="flex flex-col w-full space-y-2">
                    <Skeleton className={'w-6/12 h-3'} />
                    <Skeleton className={'w-4/12 h-3'} />
                </div>
            </div>
        </>
    )
}

export default AvatarSkeleton