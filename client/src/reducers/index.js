import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import appReducer from "./appReducer";
const reducers = combineReducers({
    users: usersReducer,
    app: appReducer
});

export default reducers;