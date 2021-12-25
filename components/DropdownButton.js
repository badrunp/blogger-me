function DropdownButton({children, onClick = null, active = false}) {
    return (
        <>
            <button type="button" onClick={onClick && onClick} className={`${active ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-transparent text-gray-600 hover:bg-zinc-200'} rounded w-full text-left font-medium text-sm px-4 py-3 flex flex-row space-x-3 items-center justify-start`}>{children}</button>
        </>
    )
}

export default DropdownButton
