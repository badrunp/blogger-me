import { postConstant, profileConstant } from "../constant/redux";

const initialState = {
    user: {},
    loading: false,
    error: null,
    posts: {
        loading: true,
        isCreate: false,
        sendPostLoading: false,
        updatePostLoading: false,
        validations: {},
        message: "",
        data: []
    }
}

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case profileConstant.RESET_PROFILE:
            return {
                ...initialState
            }
        case profileConstant.USER_PROFILE_REQUEST:
            return {
                ...initialState,
                loading: true
            }
        case profileConstant.USER_PROFILE_SUCCESS:
            return {
                ...initialState,
                user: action.payload.user,
                posts: {
                    ...state.posts,
                    data: []
                }
            }
        case profileConstant.USER_PROFILE_FAILURE:
            return {
                ...initialState,
                error: action.payload.error
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
                user: action.payload.user
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
            return {
                ...state,
                posts: {
                    ...state,
                    loading: false,
                    isCreate: false,
                    data: action.payload.posts
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
                if(item._id === post._id){
                    return {
                        ...item,
                        title: post.title,
                        category: post.category,
                        content: post.content,
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