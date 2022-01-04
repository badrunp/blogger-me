import { postConstant } from "../constant/redux";

const initialState = {
    loading: false,
    posts_home: [],
    posts_blog: [],
    error: null
}

export default function postReducer(state = initialState, action) {

    switch (action.type) {
        case postConstant.GET_POST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case postConstant.GET_POST_HOME_SUCCESS:
            return {
                ...state,
                loading: false,
                posts_home: action.payload.posts
            }
        case postConstant.GET_POST_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                posts_blog: action.payload.posts
            }
        case postConstant.GET_POST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        default:
            return state;
    }

}