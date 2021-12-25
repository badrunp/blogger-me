import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    auth: userReducer 
})

export default rootReducer;