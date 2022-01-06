import { Dialog, Transition } from "@headlessui/react"

function Modal({ children, modalActive, setModalActive, width = '' }) {
    return (
        <>
            <Transition
                show={modalActive}
                enter="transition duration-100 ease-out"
                enterFrom="opacity-0 "
                enterTo="opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Dialog onClose={() => setModalActive(false)} as={'div'} className={'fixed inset-0 overflow-y-auto z-50'}>

                    <div className="flex flex-row items-center justify-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl mx-auto min-h-screen overflow-y-auto">
                        <Dialog.Overlay className={'fixed inset-0 bg-black/50'} />

                        <div className={`${width} bg-white z-50 shadow-md rounded-lg py-4 px-6`}>
                          {children}
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Modal
