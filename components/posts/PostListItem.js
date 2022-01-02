import Avatar from "../Avatar"
import PostCategoryAndTime from "./PostCategoryAndTime"
import PostContent from "./PostContent"
import PostImage from "./PostImage"
import PostTitle from "./PostTitle"
import Dropdown from '../Dropdown'
import { Menu } from "@headlessui/react"


function PostListItem({
    id,
    title,
    content,
    category,
    image,
    time,
    avatar = true,
    imageSize = 'h-64',
    author = {},
    edited = false,
    handleClickModalEdit = null
}) {

    return (
        <>
            <div className="w-full h-auto relative flex flex-col items-start justify-start bg-white shadow rounded overflow-hidden">
                <div className={`${imageSize} relative overflow-hidden w-full`}>
                    <PostImage image={image} />

                    {
                        edited && (
                            <>
                                <div className="absolute bg-white right-1 top-1 rounded">

                                    <Dropdown title={<p>More</p>} className="w-48 md:w-36 shadow-md">
                                        <Menu.Item as="div" className="block">
                                            <button className="text-gray-700 flex text-sm flex-row items-center space-x-2 py-2 px-2 hover:bg-gray-200 w-full rounded" onClick={() => handleClickModalEdit(id, title, category, content)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                <span>Ubah</span>
                                            </button>
                                        </Menu.Item>
                                        <Menu.Item as="div" className="block">
                                            <button className="text-gray-700 flex text-sm flex-row items-center space-x-2 py-2 px-2 hover:bg-gray-200 w-full rounded" >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                <span>hapus</span>
                                            </button>
                                        </Menu.Item>
                                    </Dropdown>
                                </div>

                            </>
                        )
                    }

                </div>
                <div className="p-4 flex flex-col space-y-2">
                    <PostCategoryAndTime
                        category={category}
                        time={time}
                    />

                    <PostTitle
                        id={id}
                        title={title}
                    />

                    <PostContent
                        content={content}
                    />

                    {
                        avatar && Object.keys(author).length > 0 && (
                            <Avatar
                                image={'/images/img-blog3.png'}
                                name={author.username}
                                title={author.title}
                                id={author._id}
                            />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default PostListItem
