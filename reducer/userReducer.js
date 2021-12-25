import { userConstant } from "../constant/redux";

const initialState = {
    user: null,
    loading: true,
    message: ''
}

export default function userReducer(state = initialState, action){

    switch(action.type){
        case userConstant.ADD_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case userConstant.ADD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case userConstant.ADD_USER_FAILURE:
            return {
                ...state,
                loading: false
            }
        case userConstant.USER_LOGOUT:
            return {
                ...state,
                user: null
            }
        case userConstant.USER_REGISTER_SUCCESS: 
            return {
                ...state,
                message: action.payload.message
            }
        case userConstant.USER_REMOVE_MESSAGE:
            return {
                ...state,
                message: ''
            }
        default: 
            return state;
    }

}