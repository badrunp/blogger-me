import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deletePost, updatePost } from "../../action/postAction"
import { postConstant } from "../../constant/redux"
import Alert from "../Alert"
import PostDelete from "./PostDelete"
import PostEdit from "./PostEdit"
import PostListItem from "./PostListItem"
import PostSkeleton from "./PostSkeleton"

function PostInProfilItem({ loadingPost, data, edited = false, isLoad }) {
    const { message, updatePostLoading: loading, validations } = useSelector(state => state.profile.posts)
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

    const handleChangeInput = (e) => {
        setDataPost({
            ...dataPost,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeContent = (value) => {
        setDataPostContent(value);
    }

    const handleClickModalEdit = (id, title, category, content, summary) => {
        setDataPost({
            ...dataPost,
            id,
            title,
            category,
            summary
        })

        setDataPostContent(content)

        setModalEditActive(true)

    }


    const handleClickEdit = async () => {

        const data = {
            title: dataPost.title,
            category: dataPost.category,
            summary: dataPost.summary,
            content: dataPostContent
        }

        const isUpdate = await dispatch(updatePost(dataPost.id, data))
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
                    loadingPost && !isLoad ? (
                        [1, 2, 3].map((i) => (
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
                message && !loading ? (
                    <div className="fixed top-0 left-4 z-50">
                        <Alert message={message} className="bg-emerald-500 text-white w-52" />
                    </div>
                ) : null
            }
        </>
    )
}

export default PostInProfilItem
