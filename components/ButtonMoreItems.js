import { useRouter } from 'next/router'
import Button from './Button';

function ButtonMoreItems({posts}) {
    const router = useRouter();

    return (
        <>
            {
                posts.length > 0 && (
                    <div className="pb-14 md:pb-0 flex flex-row items-center justify-center">
                        <Button onClick={() => router.push('/blogs')} className="bg-blue-500 text-gray-100 tracking-wide font-medium hover:bg-blue-600 focus:ring-2 text-sm focus:ring-blue-300 focus:outline-none">Lihat semua</Button>
                    </div>
                )
            }
        </>
    )
}

export default ButtonMoreItems
