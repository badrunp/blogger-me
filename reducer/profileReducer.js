import { postConstant, profileConstant } from "../constant/redux";

const initialState = {
    user: {},
    loading: false,
    updatePhoto: true,
    error: null,
    skip: 6,
    total: 0,
    posts: {
        loading: true,
        isCreate: false,
        sendPostLoading: false,
        updatePostLoading: false,
        validations: {},
        message: "",
        data: [],
    }
}

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case profileConstant.UPDATE_PHOTO_PROFILE_REQUEST:
            return {
                ...state,
                updatePhoto: true
            }
        case profileConstant.UPDATE_PHOTO_PROFILE_SUCCESS:
            return {
                ...state,
                updatePhoto: false,
                user: {
                    ...state.user,
                    image: action.payload.image
                }
            }
        case profileConstant.UPDATE_PHOTO_PROFILE_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                updatePhoto: false
            }
        case profileConstant.UPDATE_TOTAL_POST:
            return {
                ...state,
                total: state.total + action.payload.count
            }
        case profileConstant.UPDATE_SKIP_POST:
            return {
                ...state,
                skip: action.payload.skip
            }
        case profileConstant.RESET_PROFILE:
            return {
                ...initialState,
                posts: {
                    ...state.posts,
                    loading: false
                }
            }
        case profileConstant.USER_PROFILE_REQUEST:
            return {
                ...initialState,
                loading: true,
            }
        case profileConstant.USER_PROFILE_SUCCESS:
            return {
                ...initialState,
                user: action.payload.user,
                total: action.payload.total,
                posts: {
                    ...state.posts,
                    loading: false
                }
            }
        case profileConstant.USER_PROFILE_FAILURE:
            return {
                ...initialState,
                error: action.payload.error,
                posts: {
                    ...state.posts,
                    loading: false
                }
            }

        case profileConstant.USER_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case profileConstant.USER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                posts: {
                    ...state.posts,
                    message: action.payload.message
                }
            }
        case profileConstant.USER_UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: false
            }

        case postConstant.USER_CREATE_POST_REQUEST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    sendPostLoading: true,
                    message: ''
                }
            }
        case postConstant.USER_CREATE_POST_SUCCESS:
            return {
                ...state,
                error: null,
                posts: {
                    ...state.posts,
                    sendPostLoading: false,
                    validations: {},
                    message: action.payload.message,
                    isCreate: true,
                    data: [
                        ...state.posts.data,
                        {
                            ...action.payload.post
                        }
                    ]
                }
            }
        case postConstant.USER_CREATE_POST_VALIDATION:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    sendPostLoading: false,
                    validations: action.payload.validations
                }
            }
        case postConstant.USER_CREATE_POST_FAILURE:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    validations: {},
                    sendPostLoading: false,
                    error: action.payload.error
                }
            }
        case postConstant.USER_POST_CLEAR_MESSAGE:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    message: ''
                }
            }

        case postConstant.GET_POST_BY_AUTHOR_REQUEST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    loading: true
                }
            }
        case postConstant.GET_POST_BY_AUTHOR_SUCCESS:
            const array = [...state.posts.data, ...action.payload.posts]
            const data = [...new Map(array.map(item => [item._id, item])).values()]
            return {
                ...state,
                posts: {
                    ...state,
                    loading: false,
                    isCreate: false,
                    data: data,
                }
            }
        case postConstant.GET_POST_BY_AUTHOR_FAILURE:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    loading: false,
                    error: action.payload.error
                }
            }
        case postConstant.UPDATE_POST_REQUEST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    updatePostLoading: true
                }
            }
        case postConstant.UPDATE_POST_SUCCESS:
            const post = action.payload.post;
            const newPosts = state.posts.data.map(item => {
                if (item._id === post._id) {
                    return {
                        ...item,
                        title: post.title,
                        category: post.category,
                        summary: post.summary,
                        content: post.content,
                        image: post.image
                    }
                }

                return item;
            })
            return {
                ...state,
                posts: {
                    ...state.posts,
                    updatePostLoading: false,
                    message: action.payload.message,
                    data: newPosts
                }
            }
        case postConstant.UPDATE_POST_VALIDATION:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    updatePostLoading: false,
                    validations: action.payload.validations
                }
            }
        case postConstant.UPDATE_POST_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                posts: {
                    ...state.posts,
                    updatePostLoading: true
                }
            }
        case postConstant.DELETE_POST_REQUEST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    updatePostLoading: true
                }
            }
        case postConstant.DELELE_POST_SUCCESS:
            const newPost = state.posts.data.filter(item => item._id != action.payload.post._id)
            return {
                ...state,
                posts: {
                    ...state.posts,
                    updatePostLoading: false,
                    message: action.payload.message,
                    data: newPost
                }
            }
        case postConstant.DELETE_POST_FAILURE:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    updatePostLoading: false,
                    error: action.payload.error
                }

            }
        default:
            return state;
    }
}