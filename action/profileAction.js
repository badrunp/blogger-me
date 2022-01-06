import Cookies from "js-cookie";
import jsonwebtoken from "jsonwebtoken";
import { profileConstant, userConstant } from "../constant/redux"

export function getUserProfile(id) {
    return async (dispatch) => {

        dispatch({
            type: profileConstant.USER_PROFILE_REQUEST
        });

        try {
            const request = await fetch(`/api/user/${id}`)
            const response = await request.json();

            const { status, user, total } = response;

            if (status === 200 && user) {

                dispatch({
                    type: profileConstant.USER_PROFILE_SUCCESS,
                    payload: {
                        user,
                        total
                    }
                })

                return true;

            }

            return false;


        } catch (error) {
            dispatch({
                type: profileConstant.USER_PROFILE_FAILURE,
                payload: {
                    error
                }
            })
            return false;
        }

    }
}

export function updateUserProfil(id, data){
    return async (dispatch) => {

        dispatch({
            type: profileConstant.USER_UPDATE_PROFILE_REQUEST
        });

        try {
            
            const request = await fetch('/api/user/' + id + '/update', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const response = await request.json();
            console.log(response);

            const {status, token} = response;

            if(status !== 200 || !token){

                // window.location = '/';
                return false;

            }

            const user = jsonwebtoken.decode(token);

            Cookies.set('_TOKEN', token);

            dispatch({
                type: userConstant.USER_LOGIN_SUCCESS,
                payload: {
                    user
                }
            })

            dispatch({
                type: profileConstant.USER_UPDATE_PROFILE_SUCCESS,
                payload: {
                    user: user
                }
            })

            return true;

        } catch (error) {
            dispatch({
                type: profileConstant.USER_UPDATE_PROFILE_FAILURE,
                payload: {
                    error
                }
            })

            return false;
        }

    }
}