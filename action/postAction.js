import Cookies from "js-cookie";
import { postConstant, profileConstant } from "../constant/redux";

export function createPost(data) {
    return async (dispatch) => {


        dispatch({ type: postConstant.USER_CREATE_POST_REQUEST })
        try {

            const request = await fetch('/api/blogs/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const { post, status, validations, message } = await request.json();

            if (status == 405) {
                Cookies.remove('_TOKEN')
                document.location.href = '/'
                return;
            }

            if (status === 402 && validations) {
                dispatch({
                    type: postConstant.USER_CREATE_POST_VALIDATION,
                    payload: {
                        validations
                    }
                })

                return false;
            }

            if (status === 200 && post) {

                dispatch({
                    type: postConstant.USER_CREATE_POST_SUCCESS,
                    payload: {
                        post,
                        message
                    }
                })

                dispatch(updateTotalPost(1))
                return true;

            }

            return false;

        } catch (error) {

            console.log(error);
            dispatch({
                type: postConstant.USER_CREATE_POST_FAILURE,
                payload: {
                    error
                }
            })

            return false;

        }

    }
}

export function getPostsByAuthor(id, limit = 6, skip = 0) {
    return async (dispatch) => {

        dispatch({
            type: postConstant.GET_POST_BY_AUTHOR_REQUEST
        });

        try {

            const resquest = await fetch(`/api/blogs/${id}/author/${limit}/${skip}`);

            const response = await resquest.json();
            console.log(response);

            const { status, posts } = response;

            if (status == 200 && posts) {
                dispatch({
                    type: postConstant.GET_POST_BY_AUTHOR_SUCCESS,
                    payload: {
                        posts
                    }
                })

                return true;

            }
            return false;

        } catch (error) {
            dispatch({
                type: postConstant.GET_POST_BY_AUTHOR_FAILURE,
                error
            })
            return false;
        }

    }
}


export function deletePost(id) {
    return async (dispatch) => {

        dispatch({ type: postConstant.DELETE_POST_REQUEST });
        try {

            const request = await fetch('/api/blogs/delete', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            })

            const { message, status, post } = await request.json()

            if (status == 405) {
                Cookies.remove('_TOKEN')
                document.location.href = '/'
                return;
            }

            if (status == 200 && message) {
                dispatch({
                    type: postConstant.DELELE_POST_SUCCESS,
                    payload: {
                        message,
                        post
                    }
                })

                dispatch(updateTotalPost(-1))

                return true;
            }

            return false;

        } catch (error) {
            dispatch({ type: postConstant.DELETE_POST_FAILURE, payload: { error } })
            return false;
        }

    }
}

export function updatePost(id, data) {
    return async (dispatch) => {


        dispatch({ type: postConstant.UPDATE_POST_REQUEST })
        try {

            const request = await fetch('/api/blogs/update/' + id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const response = await request.json();

            const { post, status, validations, message } = response;

            if (status == 405) {
                Cookies.remove('_TOKEN')
                document.location.href = '/'
                return;
            }

            if (status === 402 && validations) {
                dispatch({
                    type: postConstant.UPDATE_POST_VALIDATION,
                    payload: {
                        validations
                    }
                })

                return false;
            }

            if (status === 200 && post) {

                dispatch({
                    type: postConstant.UPDATE_POST_SUCCESS,
                    payload: {
                        message,
                        post
                    }
                });

                dispatch({
                    type: postConstant.UPDATE_POST_BY_USER_SUCCESS,
                    payload: {
                        post
                    }
                });

                return true;

            }

            return false;

        } catch (error) {
            console.log(error);
            dispatch({
                type: postConstant.UPDATE_POST_FAILURE,
                payload: {
                    error
                }
            })

            return false;

        }

    }
}


export function getPostHome() {
    return async (dispatch) => {

        dispatch({ type: postConstant.GET_POST_REQUEST });
        try {

            const request = await fetch('/api/blogs?limit=7')

            const { posts } = await request.json();

            dispatch({
                type: postConstant.GET_POST_SUCCESS,
                payload: {
                    posts
                }
            })

            return true;

        } catch (error) {
            dispatch({
                type: postConstant.GET_POST_FAILURE,
                payload: {
                    error
                }
            })

            return false;
        }

    }
}

export function getPostBlog(skip = 0, limit = 6) {
    return async (dispatch) => {

        dispatch({ type: postConstant.GET_BLOG_POSTS_REQUEST });
        try {

            const request = await fetch(`/api/blogs?limit=${limit}&skip=${skip}&order=-1`)

            const { posts } = await request.json();

            dispatch({
                type: postConstant.GET_BLOG_POSTS_SUCCESS,
                payload: {
                    posts,
                }
            })

            return {
                success: true,
                count: posts.length
            };

        } catch (error) {
            dispatch({
                type: postConstant.GET_POST_FAILURE,
                payload: {
                    error
                }
            })

            return {
                success: false
            };
        }

    }
}


export function updateTotalPost(count) {
    return async (dispatch) => {

        dispatch({
            type: profileConstant.UPDATE_TOTAL_POST,
            payload: {
                count
            }
        })

    }
}