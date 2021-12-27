import React from 'react'

function ProfilInfoItem({ label, value }) {
    return (
        <>
            <div className="w-full py-2">
                <h5 className="block text-sm font-sans text-gray-400">{label}</h5>
                <h2 className="block text-base font-semibold tracking-tight font-sans text-gray-500">{value}</h2>
            </div>
        </>
    )
}

export default ProfilInfoItem
