import Image from "next/image"
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserPhoto } from "../action/profileAction";
import { profileConstant, userConstant } from "../constant/redux";
import Container from "./Container";
import Layout from "./Layout";
import ProfilInfoItem from "./ProfilInfoItem";
import ProfilTitle from "./ProfilTitle";
import Skeleton from "./Skeleton";


export default function LayoutProfil({ children }) {

    const dispatch = useDispatch()
    const { user, total } = useSelector(state => state.profile)
    const { user: auth } = useSelector(state => state.auth)
    const { query: { id }, replace } = useRouter();

    const [isUpdatePhoto, setIsUpdatePhoto] = useState(false)


    useEffect(() => {

        if (id) {
            if (id[0] !== user._id) {
                async function getProfil() {
                    const isProfile = await dispatch(getUserProfile(id[0]))
                    if (!isProfile) {
                        replace('/')
                    }
                }

                getProfil();
            }

        }

    }, [id, user])


    const handleChangePhoto = async (e) => {

        const image = e.target.files[0]
        setIsUpdatePhoto(true)
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
            await dispatch({
                type: profileConstant.UPDATE_PHOTO_PROFILE_SUCCESS,
                payload: {
                    image: url
                }
            })
            await dispatch({
                type: userConstant.UPDATE_PHOTO_PROFILE_SUCCESS,
                payload: {
                    image: url
                }
            })

            setIsUpdatePhoto(false)
            dispatch(updateUserPhoto(auth._id, url))

        } catch (error) {
            console.log(error);
            return;
        }

    }


    return (
        <>
            <Layout title="Profil">
                <Container className="md:container">
                    <div className="w-full py-8 md:py-14 px-4 md:px-8 xl:px-14">
                        <div className="grid lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1 order-2 md:order-1 relative">
                                <div className="bg-white w-full h-auto relative shadow rounded-md">
                                    <ProfilTitle />

                                    {
                                        isUpdatePhoto && (
                                            <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
                                                <div className="bg-white py-3 px-5 flex justify-center items-center space-x-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-spin" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="block text-gray-700 text-sm font-semibold">Uploaded....</p>
                                                </div>
                                            </div>
                                        )
                                    }

                                    <div className="flex flex-col items-start justify-start py-5 px-6 space-y-4 divide-y divide-gray-300 w-full">

                                        {

                                            Object.keys(user).length > 0 ? (
                                                <Fragment>
                                                    <div className=" w-32 h-32 sm:w-40 sm:h-40 rounded-full relative mx-auto">
                                                        <Image src={user.image ? user.image : '/images/man.png'} className="rounded-full" layout="fill" alt="default image" />

                                                        {
                                                            auth?._id == user._id && (
                                                                <div className="absolute right-0 top-0">
                                                                    <label htmlFor="image" className="w-11 h-11 rounded-full bg-blue-600 flex justify-center items-center border-2 border-white cursor-pointer hover:bg-blue-700 transition duration-150 ease-in-out">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                        </svg>
                                                                    </label>
                                                                    <input type="file" className="hidden" onChange={handleChangePhoto} id="image" />
                                                                </div>
                                                            )
                                                        }
                                                    </div>

                                                    <ProfilInfoItem
                                                        label={'Nama'}
                                                        value={user.username}
                                                    />
                                                    {
                                                        id == auth?._id && (
                                                            <ProfilInfoItem
                                                                label={'Email'}
                                                                value={user.email}
                                                            />
                                                        )
                                                    }
                                                    <ProfilInfoItem
                                                        label={'Title/Job'}
                                                        value={user.title ? user.title : '-'}
                                                    />
                                                    <ProfilInfoItem
                                                        label={'Total Posts'}
                                                        value={total}
                                                    />
                                                    <ProfilInfoItem
                                                        label={'Bergabung pada'}
                                                        value={user.createdAt}
                                                    />

                                                </Fragment>
                                            ) : (
                                                <>
                                                    <div className="w-40 h-40 rounded-full bg-zinc-100 mx-auto animate-pulse relative overflow-hidden skeleton-1"></div>
                                                    {
                                                        [...Array(4)].map((item, i) => (
                                                            <div key={i} className="w-full py-2 space-y-2">
                                                                <Skeleton className={'w-2/6 h-4 skeleton-1'} />
                                                                <Skeleton className={'w-4/5 h-4 skeleton-1'} />
                                                            </div>
                                                        ))
                                                    }
                                                </>
                                            )

                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-2 order-1 md:order-2">
                                {children}
                            </div>
                        </div>
                    </div>
                </Container>
            </Layout>
        </>
    )
}
