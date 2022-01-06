import { useRouter } from 'next/router'
import Button from './Button';

function ButtonMoreItems({posts}) {
    const router = useRouter();

    return (
        <>
            {
                posts.length > 0 && (
                    <div className="pb-14 md:pb-0 flex flex-row items-center justify-center">
                        <Button onClick={() => router.push('/blogs')} className="primary">Lihat semua</Button>
                    </div>
                )
            }
        </>
    )
}

export default ButtonMoreItems
