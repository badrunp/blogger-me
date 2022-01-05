import { postConstant } from "../constant/redux";

const initialState = {
    loading: true,
    posts: [],
    total: 0,
    error: null,
    blog_posts: {
        data: [],
        loading: true,
        skip: 6
    }
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
        case postConstant.UPDATE_POST_BY_USER_SUCCESS:
            const post = action.payload.post
            const newPosts = state.posts.map(item => {
                if (item._id == post._id) {
                    return {
                        ...item,
                        title: post.title,
                        category: post.category,
                        summary: post.summary,
                        content: post.content
                    }
                }
                return item;
            })
            return {
                ...state,
                posts: newPosts
            }
        case postConstant.GET_BLOG_POSTS_REQUEST:
            return {
                ...state,
                blog_posts: {
                    ...state.blog_posts,
                    loading: true
                }
            }
        case postConstant.GET_BLOG_POSTS_SUCCESS:
            return {
                ...state,
                total: action.payload.total,
                blog_posts: {
                    ...state.blog_posts,
                    loading: false,
                    data: [...state.blog_posts.data, ...action.payload.posts]
                }
            }
        case postConstant.UPDATE_SKIP_POST:
            return {
                ...state,
                blog_posts: {
                    ...state.blog_posts,
                    skip: action.payload.skip
                }
            }
        case postConstant.GET_POST_FAILURE:
            return {
                ...state,
                loading: false,
                blog_posts: {
                    ...state.blog_posts,
                    loading: false
                },
                error: action.payload.error
            }
        default:
            return state;
    }

}