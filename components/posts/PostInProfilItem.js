import { useState } from "react"
import PostEdit from "./PostEdit"
import PostListItem from "./PostListItem"
import PostSkeleton from "./PostSkeleton"

function PostInProfilItem({ loadingPost, data, edited = false }) {
    const [modalEditActive, setModalEditActive] = useState(false)
    const [dataPost, setDataPost] = useState({
        id: '',
        title: '',
        category: '',
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

    const handleClickModalEdit = (id, title, category, content) => {
        setDataPost({
            ...dataPost,
            id,
            title,
            category,
        })

        setDataPostContent(content)

        setModalEditActive(true)
        
    }

    const handleClickEdit = () => {

        const data = {
            title: dataPost.title,
            category: dataPost.category,
            content: dataPostContent
        }

        console.log(data);

    }
    
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
                {
                    loadingPost ? (
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
                                    content={item.content}
                                    category={item.category}
                                    time={item.createdAt}
                                    image={item.image}
                                    imageSize="h-44"
                                    edited={edited}
                                    handleClickModalEdit={handleClickModalEdit}
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
            />


        </>
    )
}

export default PostInProfilItem
