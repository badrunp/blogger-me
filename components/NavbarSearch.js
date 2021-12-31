
function NavbarSearch() {
    return (
        <>
            <div className="grow hidden lg:block">
                <div className="flex flex-row items-center justify-between bg-white w-8/12 rounded px-3 overflow-hidden">
                    <input type="text" className="w-full focus:outline-none py-2 text-sm pr-3 accent-blue-500" placeholder="Search" />
                    <div className="block overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavbarSearch
