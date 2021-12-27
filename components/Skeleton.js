import React from 'react'

function Skeleton({className}) {
    return (
        <>
            <span className={`block ${className} bg-zinc-100 animate-pulse`}></span>
        </>
    )
}

export default Skeleton
