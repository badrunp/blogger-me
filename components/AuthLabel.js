function AuthLabel({ inputFor, title }) {
    return (
        <>
            <label htmlFor={inputFor} className="block mb-1 text-gray-500">{title}</label>
        </>
    )
}

export default AuthLabel
