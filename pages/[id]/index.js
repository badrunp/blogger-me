import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUserProfil } from "../../action/profileAction"
import AuthLabel from "../../components/AuthLabel"
import Button from "../../components/Button"
import Input from "../../components/Input"
import LayoutProfil from "../../components/LayoutProfile"

export default function Profil() {

    const { user, loading } = useSelector(state => state.profile)
    const [currenMenuActive, setCurrentMenuActive] = useState(0);
    const [uid, setUid] = useState();
    const dispatch = useDispatch();
    const usernameRef = useRef();
    const titleRef = useRef();
    const emailRef = useRef();

    useEffect(() => {

        if (user) {
            loadDataUser();
            setUid(user._id)
        }


    }, [user, user._id])

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

    const handleSetCurrentMenuActive = (num) => {

        setCurrentMenuActive(num)

    }

    return (
        <LayoutProfil>
            <div className="bg-white w-full h-auto relative shadow rounded-md">
                <ul className="flex flex-row items-start justify-start divide-x divide-gray-300 border-b p-2">
                    <li className="relative block">
                        <button type="button" onClick={() => handleSetCurrentMenuActive(0)} className="flex flex-row items-center text-gray-700 justify-start px-4 py-4 bg-gray-100 rounded-l space-x-1 text-sm font-medium hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="block tracking-normal">Edit Profil</span>
                        </button>
                    </li>
                    <li className="relative block">
                        <button type="button" onClick={() => handleSetCurrentMenuActive(1)} className="flex flex-row items-center text-gray-700 justify-start px-4 py-4 bg-gray-100 space-x-1 text-sm font-medium hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="block tracking-normal">My Posts</span>
                        </button>
                    </li>
                    <li className="relative block">
                        <button type="button" onClick={() => handleSetCurrentMenuActive(2)} className="flex flex-row items-center text-gray-700 justify-start px-4 py-4 bg-gray-100 rounded-r space-x-1 text-sm font-medium hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="block tracking-normal">Create Post</span>
                        </button>
                    </li>
                </ul>

                <div className="w-full relative h-auto px-4 py-6">

                    <form className={`${currenMenuActive === 0 ? 'block' : 'hidden'}`} onSubmit={handleSubmitEditProfil}>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="block">
                                <AuthLabel title={'Nama'} inputFor={'username'} />
                                <Input
                                    type="text"
                                    placeholder="Nama"
                                    name={'username'}
                                    ref={usernameRef}
                                />
                            </div>
                            <div className="block">
                                <AuthLabel title={'Email'} inputFor={'email'} />
                                <Input
                                    type="text"
                                    placeholder="Email"
                                    name={'email'}
                                    ref={emailRef}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="block">
                                <AuthLabel title={'Title/Job'} inputFor={'title'} />
                                <Input
                                    type="text"
                                    placeholder="Title/Job"
                                    name={'title'}
                                    ref={titleRef}
                                />
                            </div>

                        </div>

                        <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 ">{loading ? 'Loading...' : 'Update Profile'}</Button>
                    </form>


                    {
                        currenMenuActive === 1 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ">
                                {
                                    [3, 4, 5, 3, 4, 5].map((item, i) => (
                                        <div key={i} className="w-full h-auto relative flex flex-col items-start justify-start bg-white shadow rounded overflow-hidden">
                                            <div className="h-44 relative overflow-hidden w-full">
                                                <Image src={`/images/img-blog${item}.png`} alt="image" layout="fill" />
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
                                    ))
                                }
                            </div>
                        )
                    }

                </div>
            </div>

        </LayoutProfil>
    )
}