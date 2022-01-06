import React from 'react'
import Load from './Load'
import PostInProfilItem from './PostInProfilItem'

function PostInProfil({ auth, id, loadingPost, data, isLoad, total, handleLoadPosts }) {
    return (
        <>
            {
                auth && id && id[0] === auth._id ? (
                    id[1] === 'posts' && (
                        <>
                            <PostInProfilItem
                                loadingPost={loadingPost}
                                data={data}
                                edited={true}
                                isLoad={isLoad}
                            />

                            <Load
                                isLoad={isLoad}
                                data={data}
                                total={total}
                                handleLoadPosts={handleLoadPosts}
                            />
                        </>
                    )
                ) : (
                    <>
                        <PostInProfilItem
                            loadingPost={loadingPost}
                            data={data}
                            isLoad={isLoad}
                        />

                        <Load
                            isLoad={isLoad}
                            data={data}
                            total={total}
                            handleLoadPosts={handleLoadPosts}
                        />
                    </>
                )
            }


        </>
    )
}

export default PostInProfil
