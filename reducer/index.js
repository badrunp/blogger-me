import { combineReducers } from "redux";
import postReducer from "./postReducer";
import profileReducer from "./profileReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    auth: userReducer,
    profile: profileReducer,
    posts: postReducer
})

export default rootReducer;