function AuthInput({ type = 'text', name, placeholder = '', onChange, value, ...props }) {
    return (
        <>
            <input type={type} value={value} {...props} onChange={onChange} id={name} name={name} placeholder={placeholder} className="w-full border border-gray-300 py-3 px-5 focus:outline-none rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition duration-300 ease-in-out"  autoComplete='off' />
        </>
    )
}

export default AuthInput
