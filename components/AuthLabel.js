function AuthLabel({ inputFor, title, className="" }) {
    return (
        <>
            <label htmlFor={inputFor} className={`block mb-1 text-gray-500 ${className}`}>{title}</label>
        </>
    )
}

export default AuthLabel
