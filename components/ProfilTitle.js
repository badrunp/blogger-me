
function ProfilTitle() {
    return (
        <>
            <h2 className="text-gray-500 font-medium text-base flex items-center justify-start space-x-1 px-4 py-4 border-b border-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="block tracking-tight">Profile Info</span>
            </h2>
        </>
    )
}

export default ProfilTitle
