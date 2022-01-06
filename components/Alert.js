
function Alert({ className="", message="" }) {
    return (
        <>
            <div className={`${className} relative py-4 px-5 rounded`}>
                <span className="block text-sm text-left tracking-normal font-semibold">{message}</span>
            </div>
        </>
    )
}

export default Alert
