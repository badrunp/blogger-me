import Button from '../Button'
import Modal from '../Modal'
import ModalTitle from '../ModalTitle'

function PostDelete({ modalActive, setModalActive, handleClick, loading }) {
    return (
        <>
            <Modal modalActive={modalActive} setModalActive={setModalActive} width='w-80 sm:w-96'>
                <ModalTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <p className="block">Yakin ingin dihapus?</p>
                </ModalTitle>

                <div className='flex flex-row items-center justify-center py-2 sm:py-4 w-full space-x-4'>
                    <Button className='primary' onClick={handleClick}>{loading ? 'Loading...' : 'Yakin'}</Button>
                    <Button className='danger' onClick={() => setModalActive(false)}>Batal</Button>
                </div>
            </Modal>
        </>
    )
}

export default PostDelete
