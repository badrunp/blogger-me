import { forwardRef } from "react"

const Input = forwardRef(({ type = 'text', name, placeholder = '', onChange, value, className = '', ...props }, ref) => {
    return (
        <>
            <input type={type} ref={ref} value={value} {...props} onChange={onChange} id={name} name={name} placeholder={placeholder} className={`${className} w-full border border-gray-300 py-3 px-4 text-sm md:text-base md:px-5 focus:outline-none rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition duration-300 ease-in-out`}  autoComplete='off' />
        </>
    )
}) 

export default Input
