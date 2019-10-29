import { combineReducers } from "redux";
import appReducer from "./appReducer";
import ordersReducer from "./ordersReducer";
import productsReducer from "./productsReducer";
import customersReducer from "./customersReducer";
const reducers = combineReducers({
    app: appReducer,
    orders: ordersReducer,
    products: productsReducer,
    customers: customersReducer
});

export default reducers;