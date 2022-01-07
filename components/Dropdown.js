import { Menu, Transition } from "@headlessui/react"

function Dropdown({ title, children, className = 'w-44', padding = 'px-5 py-2', bg = 'bg-white' }) {
    return (
        <>
            <Menu as={'div'} className="relative">
                <Menu.Button className={`${padding} tracking-tight text-gray-800 text-sm  md:shadow font-semibold ${bg} rounded flex flex-row items-center space-x-2`}>
                    {title}
                </Menu.Button>
                <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="opacity-0 "
                    enterTo="opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Menu.Items className={`${className} absolute top-0 right-0 bg-white shadow-sm border border-gray-300 mt-12 rounded py-2 px-[6px] focus:outline-none`}>
                        {children}
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default Dropdown
