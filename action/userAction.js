import { userConstant } from "../constant/redux"

export function addUserRequest(){
    return async (dispatch) => {

        dispatch({ 
            type: userConstant.ADD_USER_REQUEST, 
        })

    }
}

export function addUserSuccess(user){
    return async (dispatch) => {

        dispatch({ 
            type: userConstant.ADD_USER_SUCCESS, 
            payload: user
        })

    }
}

export function addUserFailure(user){
    return async (dispatch) => {

        dispatch({ 
            type: userConstant.ADD_USER_FAILURE, 
            payload: user
        })

    }
}

export function userLogout(){
    return async (dispatch) => {

        dispatch({ 
            type: userConstant.USER_LOGOUT
        })

    }
}

export function registerSuccess(message){
    return async (dispatch) => {

        dispatch({
            type: userConstant.USER_REGISTER_SUCCESS,
            payload: {
                message: message
            }
        })

    }
}

export function userRemoveMessage(){
    return async (dispatch) => {

        dispatch({
            type: userConstant.USER_REMOVE_MESSAGE
        })

    }
}