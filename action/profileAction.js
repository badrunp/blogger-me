import Cookies from "js-cookie";
import jsonwebtoken from "jsonwebtoken";
import { postConstant, profileConstant, userConstant } from "../constant/redux"

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

export function updateUserProfil(id, data) {
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

            const { status, token, message } = response;

            if (status == 405) {
                Cookies.remove('_TOKEN')
                document.location.href = '/'
                return;
            }

            if (status !== 200 || !token) {

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
                    user: user,
                    message
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

export function updateUserPhoto(id, img) {
    return async (dispatch) => {

        dispatch({ type: profileConstant.UPDATE_PHOTO_PROFILE_REQUEST });
        try {

            const request = await fetch(`/api/user/edit-photo?id=${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ image: img })
            })

            const { image, status, token } = await request.json()

            if (status == 405) {
                Cookies.remove('_TOKEN')
                document.location.href = '/'
                return;
            }

            if (status == 200 && token) {

                Cookies.set('_TOKEN', token);

                dispatch({
                    type: profileConstant.UPDATE_PHOTO_PROFILE_SUCCESS,
                    payload: {
                        image
                    }
                })

                dispatch({ type: postConstant.POST_HOME_RESET });
                dispatch({ type: postConstant.POST_BLOG_RESET });

                return true;

            }

            return false;

        } catch (error) {
            console.log(error);
            dispatch({
                type: profileConstant.UPDATE_PHOTO_PROFILE_FAILURE,
                payload: {
                    error
                }
            })
            return false;
        }

    }
}