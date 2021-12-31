import React from 'react'

function Skeleton({className}) {
    return (
        <>
            <span className={`block ${className} bg-zinc-200 animate-pulse rounded-sm`}></span>
        </>
    )
}

export default Skeleton
