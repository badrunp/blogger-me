import Button from '../Button'
import Modal from '../Modal'
import ModalTitle from '../ModalTitle'

function PostDelete({ modalActive, setModalActive, handleClick, loading }) {
    return (
        <>
            <Modal modalActive={modalActive} setModalActive={setModalActive} width='w-96'>
                <ModalTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <p className="block">Yakin ingin dihapus?</p>
                </ModalTitle>

                <div className='flex flex-row items-center justify-center py-4 w-full space-x-4'>
                    <Button className='bg-blue-500 text-white text-sm hover:bg-blue-600 focus:ring-2' onClick={handleClick}>{loading ? 'Loading...' : 'Yakin'}</Button>
                    <Button className='bg-red-500 text-white text-sm hover:bg-red-600 focus:ring-2 focus:ring-red-300' onClick={() => setModalActive(false)}>Batal</Button>
                </div>
            </Modal>
        </>
    )
}

export default PostDelete
