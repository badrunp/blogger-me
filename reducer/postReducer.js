import { postConstant } from "../constant/redux";

const initialState = {
    loading: true,
    posts: [],
    error: null
}

export default function postReducer(state = initialState, action) {

    switch (action.type) {

        case postConstant.GET_POST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case postConstant.GET_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload.posts
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