function AuthTitle({title}) {
    return (
        <>
            <div className="flex flex-row items-center justify-start space-x-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h1 className="block text-gray-500 font-semibold text-xl">{title}</h1>
            </div>
        </>
    )
}

export default AuthTitle
