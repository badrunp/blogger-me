import AuthLabel from '../AuthLabel'
import Input from '../Input'
import dynamic from "next/dynamic";
import Button from '../Button';
import ValidationMessage from '../ValidationMessage';
import Modal from '../Modal';
import ModalTitle from '../ModalTitle';
import Textarea from '../Textarea';
import Image from 'next/image'


const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);


function PostEdit({
    modalActive,
    setModalActive,
    dataPost,
    image,
    setImage,
    dataPostContent,
    handleChangeInput,
    handleChangeContent,
    handleClick,
    loading,
    validations,
    isUpload
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
                <div className="grid grid-cols-1 mb-6">
                    <AuthLabel className="text-sm md:text-base" title={'Photo'} inputFor={'image'} />
                    <Input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}

                    />
                    <div className='w-32 h-32 relative mt-6'>
                        <Image src={image} alt={image} layout='fill' />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 mb-6">
                    <div className="block">
                        <AuthLabel className="text-sm md:text-base" title={'Summary'} inputFor={'summary'} />
                        <Textarea name={'summary'} value={dataPost.summary} onChange={handleChangeInput} />
                        <ValidationMessage validations={validations} name={'summary'} />

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
                    <Button className="primary" onClick={handleClick}>{loading || isUpload ? (isUpload ? 'Upload file...' : 'Loading...') : 'Kirim'}</Button>
                    <Button className="danger" onClick={() => setModalActive(false)}>Kembali</Button>
                </div>
            </Modal>
        </>
    )
}

export default PostEdit
