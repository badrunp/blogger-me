
function Textarea({ name, placeholder, className="", value, onChange = null }) {
    return (
        <>
            <textarea placeholder={placeholder} name={name} value={value} onChange={onChange && onChange} className={`${className} w-full h-24 border border-gray-300 py-3 px-4 text-sm md:text-base md:px-5 focus:outline-none rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition duration-300 ease-in-out`}></textarea>
        </>
    )
}

export default Textarea
