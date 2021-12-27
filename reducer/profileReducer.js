import { profileConstant } from "../constant/redux";

const initialState = {
    user: {},
    loading: false,
    error: null
}

export default function profileReducer(state = initialState,action){
    switch(action.type){
        case profileConstant.USER_PROFILE_REQUEST:
            return {
                ...initialState,
                loading: true
            }
        case profileConstant.USER_PROFILE_SUCCESS:
            return {
                ...initialState,
                user: action.payload.user
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
        default: 
            return state;
    }
}