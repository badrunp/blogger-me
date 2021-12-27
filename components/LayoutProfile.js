import Image from "next/image"
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../action/profileAction";
import Container from "./Container";
import Layout from "./Layout";
import ProfilInfoItem from "./ProfilInfoItem";
import Skeleton from "./Skeleton";


export default function LayoutProfil({ children }) {

    const dispatch = useDispatch()
    const { loading, user } = useSelector(state => state.profile)
    const router = useRouter();
    const { id } = router.query;


    useEffect(() => {
        if (id) {

            async function getProfil(){
                const isProfile = await dispatch(getUserProfile(id))
                if(!isProfile){
                    router.replace('/')
                }
            }

            getProfil();
        }
    }, [id])


    return (
        <>
            <Layout title="Profil">
                <Container className="md:container">
                    <div className="w-full py-8 md:py-14 px-4 md:px-8 xl:px-14">
                        <div className="grid lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1">
                                <div className="bg-white w-full h-auto relative shadow rounded-md">
                                    <h2 className="text-gray-500 font-medium text-base flex items-center justify-start space-x-1 px-4 py-4 border-b border-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span className="block tracking-tight">Profile Info</span>
                                    </h2>

                                    <div className="flex flex-col items-start justify-start py-5 px-6 space-y-4 divide-y divide-gray-300 w-full">

                                        {

                                            Object.keys(user).length > 0 ? (
                                                <Fragment>
                                                    <div className=" w-32 h-32 sm:w-40 sm:h-40 rounded-full relative overflow-hidden bg-zinc-100 mx-auto">
                                                        <Image src="/images/img-blog5.png" layout="fill" />
                                                    </div>

                                                    <ProfilInfoItem
                                                        label={'Nama'}
                                                        value={user.username}
                                                    />
                                                    <ProfilInfoItem
                                                        label={'Email'}
                                                        value={user.email}
                                                    />
                                                    <ProfilInfoItem
                                                        label={'Title/Job'}
                                                        value={user.title ? user.title : '-'}
                                                    />
                                                    <ProfilInfoItem
                                                        label={'Bergabung pada'}
                                                        value={user.createdAt}
                                                    />

                                                </Fragment>
                                            ) : (
                                                <>
                                                    <div className="w-40 h-40 rounded-full bg-zinc-100 mx-auto animate-pulse"></div>
                                                    {
                                                        [...Array(3)].map((item, i) => (
                                                            <div key={i} className="w-full py-2 space-y-2">
                                                                <Skeleton className={'w-2/6 h-4'} />
                                                                <Skeleton className={'w-4/5 h-4'} />
                                                            </div>
                                                        ))
                                                    }
                                                </>
                                            )

                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-2">
                                {children}
                            </div>
                        </div>
                    </div>
                </Container>
            </Layout>
        </>
    )
}