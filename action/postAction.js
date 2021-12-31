import { postConstant } from "../constant/redux";

export function createPost(data){
    return async (dispatch) => {


        dispatch({type: postConstant.USER_CREATE_POST_REQUEST})
        try {

            const request = await fetch('/api/blogs/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const response = await request.json();

            const {post, status, validations, message} = response;

            if(status === 402 && validations){
                dispatch({
                    type: postConstant.USER_CREATE_POST_VALIDATION,
                    payload: {
                        validations
                    }
                })

                return false;
            }

            if(status === 200 && post){

                dispatch({
                    type: postConstant.USER_CREATE_POST_SUCCESS,
                    payload: {
                        post,
                        message
                    }
                })
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

export function getPostsByAuthor(id){
    return async (dispatch) => {

        dispatch({
            type: postConstant.GET_POST_BY_AUTHOR_REQUEST
        });

        try {

            const resquest = await fetch('/api/blogs/' + id + '/author');

            const response = await resquest.json();
            console.log(response);

            const {status, posts} = response;

            if(status === 200 && posts){
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