import ProfilLinkItem from "./ProfilLinkItem"

function ProfilLink({ id, auth, user }) {
    return (
        <>
            <ul className="flex flex-row items-start justify-start divide-x divide-gray-300 border-b px-4 py-3">
                {
                    auth && id && id[0] === auth._id && (
                        <>
                            <ProfilLinkItem
                                url={`/${user._id}`}
                                title={'Edit Profil'}
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>}
                            />
                            <ProfilLinkItem
                                url={`/${user._id}/create-post`}
                                title={'Create Posts'}
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>}
                            />
                        </>
                    )
                }

                <ProfilLinkItem
                    url={`/${user._id}/posts`}
                    title={auth && id && id[0] === auth._id ? 'My Posts' : 'Posts'}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>}
                />
            </ul>
        </>
    )
}

export default ProfilLink
