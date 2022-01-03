import { Dialog } from "@headlessui/react"

function ModalTitle({ children }) {
    return (
        <>
            <Dialog.Title className={'flex flex-row items-center justify-start font-semibold text-xl mb-4 text-gray-700'}>
                {children}
            </Dialog.Title>
        </>
    )
}

export default ModalTitle
