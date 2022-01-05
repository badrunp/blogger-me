import Cookies from "js-cookie"
import jsonwebtoken from "jsonwebtoken"
import { userConstant } from "../constant/redux"

export function userLogout() {
    return async (dispatch) => {

        dispatch({
            type: userConstant.USER_LOGOUT
        })

    }
}


export function userLogin(data) {
    return async (dispatch) => {

        dispatch({ type: userConstant.USER_LOGIN_REQUEST });
        try {
            const request = await fetch('/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data)
            })

            const response = await request.json()

            const { status, validations, message, token, user } = response;

            if (status == 402 && Object.keys(validations).length > 0) {

                dispatch({
                    type: userConstant.USER_LOGIN_ERROR_VALIDATION,
                    payload: {
                        validations
                    }
                })

            }

            if (status == 403 && message) {

                dispatch({
                    type: userConstant.USER_LOGIN_ERROR_MESSAGE,
                    payload: {
                        message
                    }
                })

            }

            if (status == 200 && token && user) {


                Cookies.set('_TOKEN', token, {
                    expires: 7,
                    secure: true
                });

                dispatch({
                    type: userConstant.USER_LOGIN_SUCCESS,
                    payload: {
                        user
                    }
                })

                return true;
            }

            return false;

        } catch (error) {

            dispatch({
                type: userConstant.USER_LOGIN_FAILURE,
                payload: {
                    error
                }
            })

            return false;

        }

    }
}

export function userRegister(data) {
    return async (dispatch) => {


        dispatch({
            type: userConstant.USER_REGISTER_REQUEST
        })
        try {
            const request = await fetch('/api/auth/register', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(data)
            })

            const response = await request.json()

            const { status, validations, message } = response;


            if (status == 402 && Object.keys(validations).length > 0) {
                console.log(validations);
                dispatch({
                    type: userConstant.USER_REGSITER_ERROR_VALIDATION,
                    payload: {
                        validations
                    }
                })

            }
            
            if (status == 403 && message) {

                dispatch({
                    type: userConstant.USER_REGSITER_ERROR_MESSAGE,
                    payload: {
                        message
                    }
                })

            }

            if (message && status == 200) {

                dispatch({
                    type: userConstant.USER_REGSITER_SUCCESS,
                    payload: {
                        message
                    }
                });

                return true;

            }



            return false;

        } catch (error) {

            dispatch({
                type: userConstant.USER_REGSITER_FAILURE,
                payload: {
                    error
                }
            })

            return false;

        }

    }
}

export function userIsLogin() {
    return async (dispatch) => {

        dispatch({
            type: userConstant.USER_LOGIN_REQUEST,
        })

        const token = Cookies.get('_TOKEN');

        if (token) {

            const user = jsonwebtoken.decode(token);

            dispatch({
                type: userConstant.USER_LOGIN_SUCCESS,
                payload: {
                    user
                }
            })
        } else {

            dispatch({
                type: userConstant.USER_LOGOUT
            })

        }

    }
}
