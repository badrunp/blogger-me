import React from 'react'
import PostInProfilItem from './PostInProfilItem'

function PostInProfil({ auth, id, loadingPost, data }) {
    return (
        <>
            {
                auth && id && id[0] === auth._id ? (
                    id && id[1] === 'posts' && (
                        <PostInProfilItem
                            loadingPost={loadingPost}
                            data={data}
                        />
                    )
                ) : (
                    <PostInProfilItem
                        loadingPost={loadingPost}
                        data={data}
                    />
                )
            }
        </>
    )
}

export default PostInProfil
