import Button from "../Button"
import PostSkeleton from "./PostSkeleton"
import useResize from '../../hook/resize'

function Load({ isLoad, data, total, handleLoadPosts }) {

    const {width} = useResize()

    return (
        <>
            {
                isLoad && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                        {
                            [...Array(width < 640 ? 1 : 3)].map((d, i) => (
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
