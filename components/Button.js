function Button({type = 'submit', className = '', children, onClick = null, ...props}) {
    return (
        <>
            <button type={type} onClick={onClick && onClick} {...props} className={`block py-[13px] px-5 rounded-md border cursor-pointer transition duration-300 ease-in-out ${className}`}>{children}</button>

        </>
    )
}

export default Button
