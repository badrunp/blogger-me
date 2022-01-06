import Button from "../Button"
import PostSkeleton from "./PostSkeleton"

function Load({ isLoad, data, total, handleLoadPosts }) {
    return (
        <>
            {
                isLoad && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                        {
                            [...Array(3)].map((d, i) => (
                                <PostSkeleton key={i} />
                            ))
                        }
                    </div>
                )
            }

            {
                data.length < total && (
                    <div className='mt-6'>
                        <Button onClick={handleLoadPosts} className="primary mx-auto">Selanjunya</Button>
                    </div>

                )
            }
        </>
    )
}

export default Load
