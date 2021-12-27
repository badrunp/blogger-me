import Image from 'next/image'
import React from 'react'

function Avatar({ image, name, title }) {
    return (
        <>
            <div className="flex flex-row items-center justify-start space-x-3 pt-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full overflow-hidden relative">
                    <Image src={image} alt="image" layout="fill" />
                </div>

                <div className="flex flex-col">
                    <h5 className="block text-gray-800 font-semibold text-base tracking-tight font-sans">{name}</h5>
                    <h5 className="block text-gray-500 text-sm font-sans tracking-tight">{title}</h5>
                </div>
            </div>
        </>
    )
}

export default Avatar
