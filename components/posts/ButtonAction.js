
function ButtonAction({ children, onClick }) {
    return (
        <>
            <button className="text-gray-700 flex text-sm flex-row items-center space-x-2 py-2 px-2 hover:bg-gray-200 w-full rounded" onClick={onClick}>
                {children}
            </button>
        </>
    )
}

export default ButtonAction
