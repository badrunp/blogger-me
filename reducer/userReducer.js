import { userConstant } from "../constant/redux";

const initialState = {
    user: null,
    loading: false,
    message: '',
    messageSuccess: '',
    error: null,
    validations: {}
}

export default function userReducer(state = initialState, action){
    switch(action.type){
        case userConstant.UPDATE_PHOTO_PROFILE_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    image: action.payload.image
                }
            }
        case userConstant.USER_CLEAR_VALIDATIONS:
            return {
                ...state,
                validations: {}
            }
        case userConstant.USER_REMOVE_MESSAGE:
            return {
                ...state,
                messageSuccess: '',
                message: ''
            }
        case userConstant.USER_LOGOUT:
            return initialState

        case userConstant.USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userConstant.USER_LOGIN_SUCCESS:
            return {
                ...initialState,
                user: action.payload.user
            }
        case userConstant.USER_LOGIN_FAILURE:
            return {
                ...initialState,
                error: action.payload.error,
            }
        case userConstant.USER_LOGIN_ERROR_VALIDATION:
            return {
                ...initialState,
                validations: action.payload.validations
            }
        case userConstant.USER_LOGIN_ERROR_MESSAGE:
            return {
                ...initialState,
                message: action.payload.message
            }

        case userConstant.USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userConstant.USER_REGSITER_SUCCESS:
            return {
                ...initialState,
                messageSuccess: action.payload.message
            }
        case userConstant.USER_REGSITER_FAILURE:
            return {
                ...initialState,
                error: action.payload.error,
            }
        case userConstant.USER_REGSITER_ERROR_VALIDATION:
            return {
                ...initialState,
                validations: action.payload.validations
            }
        case userConstant.USER_REGSITER_ERROR_MESSAGE:
            return {
                ...initialState,
                message: action.payload.message
            }
        default: 
            return state;
    }

}