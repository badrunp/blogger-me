function Button({type = 'submit', className = '', children}) {
    return (
        <>
            <button type={type} className={`block py-2 px-5 rounded-md border cursor-pointer transition duration-300 ease-in-out ${className}`}>{children}</button>

        </>
    )
}

export default Button
