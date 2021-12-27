import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    auth: userReducer,
    profile: profileReducer
})

export default rootReducer;