import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost, getPostsByAuthor } from "../../action/postAction"
import { updateUserProfil } from "../../action/profileAction"
import Alert from "../../components/Alert"
import AuthLabel from "../../components/AuthLabel"
import Button from "../../components/Button"
import Input from "../../components/Input"
import LayoutProfil from "../../components/LayoutProfile"
import PostInProfil from "../../components/posts/PostInProfil"
import ProfilLink from "../../components/ProfilLink"
import ValidationMessage from "../../components/ValidationMessage"
import { postConstant, profileConstant } from "../../constant/redux"
import dynamic from "next/dynamic";
import Textarea from '../../components/Textarea';

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);


export default function Profil() {

    const { query: { id } } = useRouter();
    const { user, loading, total, skip, posts: { loading: loadingPost, validations, data, message, sendPostLoading, isCreate } } = useSelector(state => state.profile)
    const { user: auth } = useSelector(state => state.auth);
    const [uid, setUid] = useState();
    const dispatch = useDispatch();
    const usernameRef = useRef();
    const titleRef = useRef();
    const emailRef = useRef();
    const [isLoad, setIsLoad] = useState(false)
    const [uploadError, setUploadError] = useState('')
    const [isUpload, setIsUpload] = useState(false)


    const [dataPost, setDataPost] = useState({
        title: '',
        category: '',
        summary: '',
    })
    const [image, setImage] = useState('')
    const [dataContent, setDataContent] = useState("");

    useEffect(() => {

        if (user && auth && id && id[0] === auth._id) {
            usernameRef.current.value = user.username ? user.username : '';
            titleRef.current.value = user.title ? user.title : '';
            emailRef.current.value = user.email ? user.email : '';
            setUid(user._id)
        }

    }, [user, auth, id])

    useEffect(() => {

        if (id) {
            if (auth && id[0] === auth._id) {
                if (id[1] === 'posts') {
                    if (isCreate || data.length == 0) {
                        dispatch(getPostsByAuthor(id[0]))
                    }
                }
            } else {
                dispatch(getPostsByAuthor(id[0]))
            }
        }

        return () => setUploadError('')

    }, [id, auth])


    const handleSubmitEditProfil = async (e) => {
        e.preventDefault();

        const user = {
            username: usernameRef.current.value,
            title: titleRef.current.value,
        }

        const isUpdate = dispatch(updateUserProfil(uid, user))
        if (isUpdate) {
            setTimeout(() => {
                dispatch({ type: postConstant.USER_POST_CLEAR_MESSAGE })
            }, 3000)
        }
    }


    const handleSubmitCreatePost = async (e) => {
        e.preventDefault();
        const datas = {
            title: dataPost.title,
            category: dataPost.category,
            summary: dataPost.summary,
            content: dataContent
        }
        
        const array = []
        
        Object.keys(data).map(item => {
            if (item == "content" && dataContent == "") {
                array.push(item)
            } else if (dataPost[item] == "") {
                array.push(item)
            }
        })
        
        if (array.length === 0) {
            if (image != "") {
                setIsUpload(true)
                const data = new FormData();
                data.append('file', image)
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
            } else {
                setUploadError("Image is required")
                setTimeout(() => {
                    setUploadError('')
                }, 3000)
                return;
            }
        }

        const isPost = await dispatch(createPost(datas))
        if (isPost) {
            setDataPost({
                title: '',
                category: '',
                summary: ''
            })
            setDataContent('');
            setImage('')
            setTimeout(() => {
                dispatch({ type: postConstant.USER_POST_CLEAR_MESSAGE })
            }, 3000)
        }
    }

    const handleChangeInputPost = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setDataPost({
            ...dataPost,
            [name]: value
        })

    }

    const handleLoadPosts = async (e) => {
        e.preventDefault()
        let limit = 3;
        setIsLoad(true)
        if (data.length < total) {
            const isLoad = await dispatch(getPostsByAuthor(id[0], limit, skip))
            if (isLoad) {
                dispatch({ type: profileConstant.UPDATE_SKIP_POST, payload: { skip: skip + limit } })
                setIsLoad(false)
            } else {
                setIsLoad(false)
            }
        }

    }

    return (
        <LayoutProfil>
            <div className="bg-white w-full h-auto relative shadow rounded-md">

                <ProfilLink
                    id={id}
                    user={user}
                    auth={auth}
                />


                <div className="w-full relative h-auto px-4 py-6">

                    {
                        auth && id && id[0] === auth._id && (
                            <form className={`${id && !id.includes('posts') && !id.includes('create-post') ? 'block' : 'hidden'}`} onSubmit={handleSubmitEditProfil}>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                    <div className="block">
                                        <AuthLabel className="text-sm md:text-base" title={'Nama'} inputFor={'username'} />
                                        <Input
                                            type="text"
                                            placeholder="Nama"
                                            name={'username'}
                                            ref={usernameRef}
                                        />
                                    </div>
                                    <div className="block">
                                        <AuthLabel className="text-sm md:text-base" title={'Email'} inputFor={'email'} />
                                        <Input
                                            type="text"
                                            placeholder="Email"
                                            name={'email'}
                                            ref={emailRef}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                    <div className="block">
                                        <AuthLabel className="text-sm md:text-base" title={'Title/Job'} inputFor={'title'} />
                                        <Input
                                            type="text"
                                            placeholder="Title/Job"
                                            name={'title'}
                                            ref={titleRef}
                                        />
                                    </div>

                                </div>

                                <Button type="submit" className="primary">{loading ? 'Loading...' : 'Simpan'}</Button>
                            </form>
                        )
                    }

                    <PostInProfil
                        auth={auth}
                        id={id}
                        loadingPost={loadingPost}
                        isLoad={isLoad}
                        data={data}
                        total={total}
                        handleLoadPosts={handleLoadPosts}
                    />

                    {
                        auth && id && id[0] === auth._id && (
                            <form className={`${id && id[1] === 'create-post' ? 'block' : 'hidden'}`} onSubmit={handleSubmitCreatePost}>

                                {
                                    uploadError && (
                                        <div className="fixed top-2 left-2 md:left-3 md:top-3 z-50">
                                            <Alert message={uploadError} className="bg-red-500 text-white mb-6 w-60" />
                                        </div>
                                    )
                                }

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                    <div className="block">
                                        <AuthLabel className="text-sm md:text-base" title={'Title'} inputFor={'title'} />
                                        <Input
                                            type="text"
                                            placeholder="Title"
                                            name={'title'}
                                            value={dataPost.title}
                                            onChange={handleChangeInputPost}
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
                                            onChange={handleChangeInputPost}

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

                                </div>
                                <div className="grid grid-cols-1 gap-6 mb-6">
                                    <div className="block">
                                        <AuthLabel className="text-sm md:text-base" title={'Summary'} inputFor={'summary'} />
                                        <Textarea name={'summary'} value={dataPost.summary} onChange={handleChangeInputPost} />
                                        <ValidationMessage validations={validations} name={'summary'} />

                                    </div>

                                </div>
                                <div className="grid grid-cols-1 gap-6 mb-6">
                                    <div className="block">
                                        <AuthLabel className="text-sm md:text-base" title={'Content'} inputFor={'content'} />
                                        <MDEditor
                                            value={dataContent}
                                            onChange={(value) => setDataContent(value)}
                                        />
                                        <ValidationMessage validations={validations} name={'content'} />

                                    </div>

                                </div>

                                <Button type="submit" className="primary">{sendPostLoading || isUpload ? (isUpload ? 'Upload file...' : 'Loading...') : 'Tambah'}</Button>
                            </form>
                        )
                    }


                </div>
            </div>

            {
                message && (
                    <div className="fixed top-2 left-2 md:left-3 md:top-3 z-50">
                        <Alert message={message} className="bg-emerald-500 text-white w-60" />
                    </div>
                )
            }

        </LayoutProfil>
    )
}

export function getServerSideProps(ctx) {

    if (ctx.params.id.length > 2) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}