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
import { postConstant } from "../../constant/redux"
import dynamic from "next/dynamic";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);


export default function Profil() {

    const { query: { id } } = useRouter();
    const { user, loading, posts: { loading: loadingPost, validations, data, message, sendPostLoading, isCreate } } = useSelector(state => state.profile)
    const { user: auth } = useSelector(state => state.auth);
    const [uid, setUid] = useState();
    const dispatch = useDispatch();
    const usernameRef = useRef();
    const titleRef = useRef();
    const emailRef = useRef();

    const [dataPost, setDataPost] = useState({
        title: '',
        category: '',
    })
    const [dataContent, setDataContent] = useState("");

    useEffect(() => {

        if (user && auth && id && id[0] === auth._id) {
            loadDataUser();
            setUid(user._id)
        }


    }, [user, user._id, auth, id])

    useEffect(() => {

        if (auth && id) {
            if (id[0] === auth._id) {
                if (id[1] === 'posts') {
                    if (isCreate || data.length === 0) {
                        dispatch(getPostsByAuthor(id[0]))
                    }
                }
            } else {
                dispatch(getPostsByAuthor(id[0]))
            }

        }


    }, [id, auth])

    const loadDataUser = () => {
        usernameRef.current.value = user.username ? user.username : '';
        titleRef.current.value = user.title ? user.title : '';
        emailRef.current.value = user.email ? user.email : '';
    }

    const handleSubmitEditProfil = (e) => {
        e.preventDefault();

        const user = {
            username: usernameRef.current.value,
            title: titleRef.current.value,
        }

        dispatch(updateUserProfil(uid, user))
    }


    const handleSubmitCreatePost = async (e) => {
        e.preventDefault();

        const data = {
            title: dataPost.title,
            category: dataPost.category,
            content: dataContent
        }

        const isPost = await dispatch(createPost(data))
        if (isPost) {
            setDataPost({
                title: '',
                category: '',
            })
            setDataContent('');
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

                                <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 text-sm md:text-base">{loading ? 'Loading...' : 'Update Profile'}</Button>
                            </form>
                        )
                    }

                    <PostInProfil
                        auth={auth}
                        id={id}
                        loadingPost={loadingPost}
                        data={data}
                    />


                    {
                        auth && id && id[0] === auth._id && (
                            <form className={`${id && id[1] === 'create-post' ? 'block' : 'hidden'}`} onSubmit={handleSubmitCreatePost}>
                                {
                                    message && (
                                        <Alert className="my-6 mt-0 bg-green-500 text-white" message={message} />
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

                                <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 text-sm md:text-base">{sendPostLoading ? 'Loading...' : 'Tambah Post'}</Button>
                            </form>
                        )
                    }


                </div>
            </div>

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