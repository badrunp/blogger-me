import Image from "next/image"
import { useRouter } from "next/router"
import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../action/profileAction";
import Container from "./Container";
import Layout from "./Layout";
import ProfilInfoItem from "./ProfilInfoItem";
import ProfilTitle from "./ProfilTitle";
import Skeleton from "./Skeleton";


export default function LayoutProfil({ children }) {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.profile)
    const { query: { id }, replace } = useRouter();


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

    }, [id])


    return (
        <>
            <Layout title="Profil">
                <Container className="md:container">
                    <div className="w-full py-8 md:py-14 px-4 md:px-8 xl:px-14">
                        <div className="grid lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1">
                                <div className="bg-white w-full h-auto relative shadow rounded-md">
                                    <ProfilTitle />

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
                                                        [...Array(3)].map((item) => (
                                                            <div key={item} className="w-full py-2 space-y-2">
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
