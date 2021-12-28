import { postConstant, profileConstant } from "../constant/redux";

const initialState = {
    user: {},
    loading: false,
    error: null,
    posts: {
        loading: false,
        validations: {},
        message: "",
        data: []
    }
}

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
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
                    loading: true,
                    message: ''
                }
            }
        case postConstant.USER_CREATE_POST_SUCCESS:
            return {
                ...state,
                error: null,
                posts: {
                    ...state.posts,
                    loading: false,
                    validations: {},
                    message: action.payload.message,
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
                    loading: false,
                    validations: action.payload.validations
                }
            }
        case postConstant.USER_CREATE_POST_FAILURE:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    validations: {},
                    loading: false,
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

        case postConstant.GET_USER_BY_ID_REQUEST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    loading: true
                }
            }
        case postConstant.GET_USER_BY_ID_SUCCESS:
            return {
                ...state,
                posts: {
                    ...state,
                    loading: false,
                    data: action.payload.posts
                }
            }
        case postConstant.GET_USER_BY_ID_FAILURE:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    loading: false,
                    error: action.payload.error
                }
        }
        default:
            return state;
    }
}