import React from 'react'

function Alert({ className="", message="" }) {
    return (
        <>
            <div className={`relative py-4 px-5 rounded mt-6 ${className}`}>
                <span className="block text-sm text-left tracking-normal">{message}</span>
            </div>
        </>
    )
}

export default Alert
