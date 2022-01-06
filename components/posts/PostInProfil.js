import React from 'react'
import Button from '../Button'
import PostInProfilItem from './PostInProfilItem'
import PostSkeleton from './PostSkeleton'

function PostInProfil({ auth, id, loadingPost, data, isLoad, total, handleLoadPosts, page = '' }) {
    return (
        <>
            {
                auth && id && id[0] === auth._id ? (
                    id && id[1] === 'posts' && (
                        <PostInProfilItem
                            loadingPost={loadingPost}
                            data={data}
                            edited={true}
                            isLoad={isLoad}
                        />
                    )
                ) : (
                    <PostInProfilItem
                        loadingPost={loadingPost}
                        data={data}
                        isLoad={isLoad}
                    />
                )
            }

            {
                page && page === 'posts' && (
                    <>
                        {
                            isLoad && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                                    {
                                        [...Array(3)].map((d, i) => (
                                            <PostSkeleton />
                                        ))
                                    }
                                </div>
                            )
                        }

                        {
                            data.length > 0 && data.length < total && (
                                <div className='mt-6'>
                                    <Button onClick={handleLoadPosts} className="w-max mx-auto bg-blue-500 text-gray-100 tracking-wide font-medium hover:bg-blue-600 focus:ring-2 text-sm focus:ring-blue-300">Selanjunya</Button>
                                </div>

                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default PostInProfil
