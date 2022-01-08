import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deletePost, updatePost } from "../../action/postAction"
import { postConstant } from "../../constant/redux"
import Alert from "../Alert"
import PostDelete from "./PostDelete"
import PostEdit from "./PostEdit"
import PostListItem from "./PostListItem"
import PostSkeleton from "./PostSkeleton"

function PostInProfilItem({ loadingPost, data, edited = false, isLoad }) {
    const { updatePostLoading: loading, validations } = useSelector(state => state.profile.posts)
    const dispatch = useDispatch()
    const [modalEditActive, setModalEditActive] = useState(false)
    const [modalDeleteActive, setModalDeleteActive] = useState(false)
    const [postId, setPostId] = useState('')
    const [dataPost, setDataPost] = useState({
        id: '',
        title: '',
        category: '',
        summary: ''
    })
    const [dataPostContent, setDataPostContent] = useState('')
    const [image, setImage] = useState('')
    const [newImage, setNewImage] = useState('')
    const [isUpload, setIsUpload] = useState('')
    const [uploadError, setUploadError] = useState('')



    const handleChangeInput = (e) => {
        setDataPost({
            ...dataPost,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeContent = (value) => {
        setDataPostContent(value);
    }

    const handleClickModalEdit = (id, title, category, content, summary, image) => {
        setDataPost({
            ...dataPost,
            id,
            title,
            category,
            summary
        })

        setDataPostContent(content)
        setImage(image)
        setModalEditActive(true)

    }


    const handleClickEdit = async () => {

        const datas = {
            title: dataPost.title,
            category: dataPost.category,
            summary: dataPost.summary,
            content: dataPostContent,
            image: image
        }

        const array = []
        
        Object.keys(datas).map(item => {
            if (item == "content" && dataPostContent == "") {
                array.push(item)
            } else if (dataPost[item] == "") {
                array.push(item)
            }
        })
        
        if (array.length === 0) {
            if (newImage != "") {
                setIsUpload(true)
                const data = new FormData();
                data.append('file', newImage)
                data.append('upload_preset', 'blogger-me')
                data.append('cloud_name', 'dha5gfvpi');

                try {

                    const request = await fetch('https://api.cloudinary.com/v1_1/dha5gfvpi/image/upload', {
                        method: "POST",
                        body: data
                    })

                    const { url } = await request.json()
                    datas.image = url
                    setIsUpload(false)

                } catch (error) {
                    console.log(error);
                    setUploadError('Something Wrong')
                    setTimeout(() => {
                        setUploadError('')
                    }, 3000)
                    return;
                }
            }
        }

        const isUpdate = await dispatch(updatePost(dataPost.id, datas))
        if (isUpdate) {
            setModalEditActive(false)
            setTimeout(() => {
                dispatch({ type: postConstant.USER_POST_CLEAR_MESSAGE })
            }, 3000)
        }

    }

    const handleClickModalDelete = (id) => {
        setPostId(id)
        setModalDeleteActive(true)
    }

    const handleClickDelete = async () => {
        const isDelete = await dispatch(deletePost(postId))
        if (isDelete) {
            setModalDeleteActive(false)
            setTimeout(() => {
                dispatch({ type: postConstant.USER_POST_CLEAR_MESSAGE })
            }, 3000)
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
                {
                    loadingPost ? (
                        [...Array(3)].map((d, i) => (
                            <PostSkeleton key={i} />
                        ))
                    ) : (
                        data.length > 0 ? (
                            data.map(item => (
                                <PostListItem
                                    key={item._id}
                                    id={item._id}
                                    title={item.title}
                                    summary={item.summary}
                                    content={item.content}
                                    category={item.category}
                                    time={item.createdAt}
                                    image={item.image}
                                    imageSize="h-44"
                                    edited={edited}
                                    handleClickModalEdit={handleClickModalEdit}
                                    handleClickModalDelete={handleClickModalDelete}
                                />
                            ))
                        ) : (
                            <p className="block text-gray-700  text-sm">Tidak ada post!</p>
                        )
                    )
                }
            </div>


            <PostEdit
                modalActive={modalEditActive}
                setModalActive={setModalEditActive}
                dataPost={dataPost}
                image={image}
                setImage={setNewImage}
                isUpload={isUpload}
                dataPostContent={dataPostContent}
                handleChangeInput={handleChangeInput}
                handleChangeContent={handleChangeContent}
                handleClick={handleClickEdit}
                loading={loading}
                validations={validations}
            />

            <PostDelete
                modalActive={modalDeleteActive}
                setModalActive={setModalDeleteActive}
                handleClick={handleClickDelete}
                loading={loading}
            />

            {
                uploadError && (
                    <div className="fixed top-2 left-2 md:left-3 md:top-3 z-50">
                        <Alert message={uploadError} className="bg-red-500 text-white mb-6 w-60" />
                    </div>
                )
            }
        </>
    )
}

export default PostInProfilItem
