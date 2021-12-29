import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createPost, getPostsByAuthor } from "../../action/postAction"
import { updateUserProfil } from "../../action/profileAction"
import Alert from "../../components/Alert"
import AuthLabel from "../../components/AuthLabel"
import Button from "../../components/Button"
import Input from "../../components/Input"
import LayoutProfil from "../../components/LayoutProfile"
import Skeleton from "../../components/Skeleton"
import Textarea from "../../components/Textarea"
import ValidationMessage from "../../components/ValidationMessage"
import { postConstant } from "../../constant/redux"

export default function Profil() {

    const { id } = useRouter().query;
    const { user, loading, posts: { loading: loadingPost, validations, data, message } } = useSelector(state => state.profile)
    const { user: auth } = useSelector(state => state.auth);
    const [uid, setUid] = useState();
    const dispatch = useDispatch();
    const usernameRef = useRef();
    const titleRef = useRef();
    const emailRef = useRef();

    const [dataPost, setDataPost] = useState({
        title: '',
        category: '',
        content: ''
    })

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
                    if (data.length === 0) {
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

        const isPost = await dispatch(createPost(dataPost))
        if (isPost) {
            setDataPost({
                title: '',
                category: '',
                content: ''
            })
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
                <ul className="flex flex-row items-start justify-start divide-x divide-gray-300 border-b px-4 py-3">


                    {
                        auth && id && id[0] === auth._id && (
                            <>
                                <li className="relative block">
                                    <Link href={`/${user._id}`}>
                                        <a className="flex flex-row items-center text-gray-600 sm:text-gray-700 justify-start px-4 py-3 sm:py-4 bg-gray-100 rounded-l space-x-1 text-xs sm:text-sm font-medium hover:bg-gray-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            <span className="hidden sm:block tracking-normal">Edit Profil</span>
                                        </a>
                                    </Link>
                                </li>
                            </>
                        )
                    }
                    <li className="relative block">
                        <Link href={`/${user._id}/posts`}>
                            <a className="flex flex-row items-center text-gray-600 sm:text-gray-700 justify-start px-4 py-3 sm:py-4 bg-gray-100 space-x-1 text-xs sm:text-sm font-medium hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                                <span className="hidden sm:block tracking-normal">{auth && id && id[0] === auth._id ? 'My Posts' : 'Posts'}</span>
                            </a>
                        </Link>
                    </li>
                    {
                        auth && id && id[0] === auth._id && (
                            <>
                                <li className="relative block">
                                    <Link href={`/${user._id}/create-post`}>
                                        <a className="flex flex-row items-center text-gray-600 sm:text-gray-700 justify-start px-4 py-3 sm:py-4 bg-gray-100 rounded-r space-x-1 text-xs sm:text-sm font-medium hover:bg-gray-200">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="hidden sm:block tracking-normal">Create Post</span>
                                        </a>
                                    </Link>
                                </li>
                            </>
                        )
                    }
                </ul>

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

                    {
                        auth && id && id[0] === auth._id ? (
                            id && id[1] === 'posts' && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
                                    {
                                        loadingPost ? (
                                            [1, 2, 3].map((i) => (
                                                <div key={i} className="flex flex-col items-start justify-start space-y-4">
                                                    <Skeleton className="w-full h-44" />
                                                    <div className="flex flex-row items-start space-x-2 w-full">
                                                        <Skeleton className={'w-3/12 h-3'} />
                                                        <Skeleton className={'w-2/12 h-3'} />
                                                    </div>
                                                    <div className="flex flex-col items-start space-y-2 w-full">
                                                        <Skeleton className={'w-full h-4'} />
                                                        <Skeleton className={'w-8/12 h-4'} />
                                                        <Skeleton className={'w-4/12 h-4'} />
                                                    </div>
                                                    <div className="flex flex-row w-full space-x-3 items-center">
                                                        <Skeleton className={'w-10 h-10 rounded-full flex-shrink-0'} />
                                                        <div className="flex flex-col w-full space-y-2">
                                                            <Skeleton className={'w-6/12 h-3'} />
                                                            <Skeleton className={'w-4/12 h-3'} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            data.length > 0 ? (
                                                data.map(item => (
                                                    <Fragment key={item._id}>
                                                        <div className="w-full h-auto relative flex flex-col items-start justify-start bg-white shadow rounded overflow-hidden">
                                                            <div className="h-44 relative overflow-hidden w-full">
                                                                <Image className="object-cover object-top" src={`/images/img-blog${4}.png`} alt="image" layout="fill" />
                                                            </div>
                                                            <div className="p-4 flex flex-col space-y-2">
                                                                <div className="flex flex-row items-center space-x-2">
                                                                    <h5 className="block text-xs tracing-tight text-blue-500 font-semibold">Category</h5>
                                                                    <span className="block">-</span>
                                                                    <h5 className="block text-xs text-gray-600 tracing-tight">2020-06-12</h5>
                                                                </div>

                                                                <Link href={'/blogs/1'}>
                                                                    <a className="blocktext-lg font-semibold text-gray-800 hover:underline w-max">Ini adalah judul blog</a>
                                                                </Link>

                                                                <p className="block text-xs text-gray-600">Daan ini adalah conetetc blog pos yang saya buat di dala tag p karena menurut saya cocok untuk ukuran text uang seperti ada di dalah text ini</p>

                                                            </div>
                                                        </div>
                                                    </Fragment>
                                                ))
                                            ) : (
                                                <p className="block text-gray-700  text-sm">Kosong</p>
                                            )
                                        )
                                    }
                                </div>
                            )
                        ) : (

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
                                {
                                    loadingPost ? (
                                        [1, 2, 3].map((i) => (
                                            <div key={i} className="flex flex-col items-start justify-start space-y-4">
                                                <Skeleton className="w-full h-44" />
                                                <div className="flex flex-row items-start space-x-2 w-full">
                                                    <Skeleton className={'w-3/12 h-3'} />
                                                    <Skeleton className={'w-2/12 h-3'} />
                                                </div>
                                                <div className="flex flex-col items-start space-y-2 w-full">
                                                    <Skeleton className={'w-full h-4'} />
                                                    <Skeleton className={'w-8/12 h-4'} />
                                                    <Skeleton className={'w-4/12 h-4'} />
                                                </div>
                                                <div className="flex flex-row w-full space-x-3 items-center">
                                                    <Skeleton className={'w-10 h-10 rounded-full flex-shrink-0'} />
                                                    <div className="flex flex-col w-full space-y-2">
                                                        <Skeleton className={'w-6/12 h-3'} />
                                                        <Skeleton className={'w-4/12 h-3'} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        data.length > 0 ? (
                                            data.map(item => (
                                                <Fragment key={item._id}>
                                                    <div className="w-full h-auto relative flex flex-col items-start justify-start bg-white shadow rounded overflow-hidden">
                                                        <div className="h-44 relative overflow-hidden w-full">
                                                            <Image className="object-cover object-top" src={`/images/img-blog${4}.png`} alt="image" layout="fill" />
                                                        </div>
                                                        <div className="p-4 flex flex-col space-y-2">
                                                            <div className="flex flex-row items-center space-x-2">
                                                                <h5 className="block text-xs tracing-tight text-blue-500 font-semibold">Category</h5>
                                                                <span className="block">-</span>
                                                                <h5 className="block text-xs text-gray-600 tracing-tight">2020-06-12</h5>
                                                            </div>

                                                            <Link href={'/blogs/1'}>
                                                                <a className="blocktext-lg font-semibold text-gray-800 hover:underline w-max">Ini adalah judul blog</a>
                                                            </Link>

                                                            <p className="block text-xs text-gray-600">Daan ini adalah conetetc blog pos yang saya buat di dala tag p karena menurut saya cocok untuk ukuran text uang seperti ada di dalah text ini</p>

                                                        </div>
                                                    </div>
                                                </Fragment>
                                            ))
                                        ) : (
                                            <p className="block text-gray-700  text-sm">Kosong</p>
                                        )
                                    )
                                }
                            </div>

                        )
                    }


                    {
                        auth && id && id[0] === auth._id && (
                            <form className={`${id && id[1] === 'create-post' ? 'block' : 'hidden'}`} onSubmit={handleSubmitCreatePost}>
                                {
                                    message && (
                                        <Alert className="my-6 mt-0 bg-green-600 text-white" message={message} />
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
                                        <Textarea
                                            name={'content'}
                                            value={dataPost.content}
                                            placeholder={'Content'}
                                            onChange={handleChangeInputPost}
                                        />
                                        <ValidationMessage validations={validations} name={'content'} />

                                    </div>

                                </div>

                                <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 text-sm md:text-base">{loadingPost ? 'Loading...' : 'Tambah Post'}</Button>
                            </form>
                        )
                    }


                </div>
            </div>

        </LayoutProfil>
    )
}