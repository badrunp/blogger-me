import Avatar from "../Avatar"
import PostCategoryAndTime from "./PostCategoryAndTime"
import PostContent from "./PostContent"
import PostImage from "./PostImage"
import PostTitle from "./PostTitle"
import Dropdown from '../Dropdown'
import { Menu } from "@headlessui/react"
import ButtonAction from "./ButtonAction"


function PostListItem({
    id,
    title,
    summary,
    content,
    category,
    image,
    time,
    avatar = true,
    imageSize = 'h-64',
    author = {},
    edited = false,
    handleClickModalEdit = null,
    handleClickModalDelete = null,
    max
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

                                    <Dropdown padding="py-1 px-1" title={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    } className="w-48 md:w-36 shadow">
                                        <Menu.Item as="div" className="block">
                                            <ButtonAction onClick={() => handleClickModalEdit(id, title, category, content, summary, image)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                <p>Ubah</p>
                                            </ButtonAction>
                                        </Menu.Item>
                                        <Menu.Item as="div" className="block">
                                            <ButtonAction onClick={() => handleClickModalDelete(id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                <p>hapus</p>
                                            </ButtonAction>
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
                        content={summary}
                        max={max}
                    />

                    {
                        avatar && Object.keys(author).length > 0 && (
                            <Avatar
                                image={author?.image}
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
