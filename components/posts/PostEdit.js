import { Dialog, Transition } from '@headlessui/react'
import AuthLabel from '../AuthLabel'
import Input from '../Input'
import dynamic from "next/dynamic";
import Button from '../Button';
import ValidationMessage from '../ValidationMessage';
import Modal from '../Modal';
import ModalTitle from '../ModalTitle';


const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);


function PostEdit({
    modalActive,
    setModalActive,
    dataPost,
    dataPostContent,
    handleChangeInput,
    handleChangeContent,
    handleClick,
    loading,
    validations
}) {
    return (
        <>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <ModalTitle>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <p className="block">Ubah Post</p>
                </ModalTitle>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="block">
                        <AuthLabel className="text-sm md:text-base" title={'Title'} inputFor={'title'} />
                        <Input
                            type="text"
                            placeholder="Title"
                            name={'title'}
                            value={dataPost.title}
                            onChange={handleChangeInput}
                        />
                        <ValidationMessage validations={validations} name={'title'} />

                    </div>
                    <div className="block">
                        <AuthLabel className="text-sm md:text-base" title={'Kategori'} inputFor={'category'} />
                        <Input
                            type="text"
                            placeholder="Kategori"
                            name={'category'}
                            value={dataPost.category}
                            onChange={handleChangeInput}

                        />
                        <ValidationMessage validations={validations} name={'category'} />

                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 mb-6">
                    <div className="block">
                        <AuthLabel className="text-sm md:text-base" title={'Content'} inputFor={'content'} />
                        <MDEditor
                            value={dataPostContent}
                            onChange={(value) => handleChangeContent(value)}
                        />
                        <ValidationMessage validations={validations} name={'content'} />

                    </div>

                </div>

                <div className="flex flex-row items-center space-x-3">
                    <Button className="bg-blue-500 text-white text-sm hover:bg-blue-600 focus:ring-2" onClick={handleClick}>{loading ? 'Loading...' : 'Kirim'}</Button>
                    <Button className="bg-red-500 text-white text-sm hover:bg-red-600 focus:ring-2 focus:ring-red-300" onClick={() => setModalActive(false)}>Kembali</Button>
                </div>
            </Modal>
        </>
    )
}

export default PostEdit
