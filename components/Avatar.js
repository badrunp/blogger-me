import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Avatar({ image, name, title, id }) {
    return (
        <>
            <div className="flex flex-row items-center justify-start space-x-3 pt-2">
                <div className="w-10 h-10 bg-zinc-200 rounded-full overflow-hidden relative">
                    <Image src={image ? image : '/images/man.png'} alt="default avatar" layout="fill" />
                </div>

                <div className="flex flex-col">
                    <Link href={`/${id}`}>
                        <a className="block text-gray-800 font-semibold text-base tracking-tight font-sans hover:underline">{name}</a>
                    </Link>
                    <h5 className="block text-gray-500 text-sm font-sans tracking-tight">{title}</h5>
                </div>
            </div>
        </>
    )
}

export default Avatar
