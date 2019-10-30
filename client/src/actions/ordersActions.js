import axios from "axios";

export const FETCH_ORDERS_START = "FETCH_ORDERS_START";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_ERROR = "FETCH_ORDERS_ERROR";
export const SORT_ORDERS = "SORT_ORDERS";
export const SEARCH_ORDER_BY_ID = "SEARCH_ORDER_BY_ID";
export const SHOW_ORDERS_BY_CUSTOMER = "SHOW_ORDERS_BY_CUSTOMER";
export const SHOW_ALL_ORDERS = "SHOW_ALL_ORDERS";
export const FETCH_ORDERS_BY_CUSTOMER_START = "FETCH_ORDERS_BY_CUSTOMER_START";
export const FETCH_ORDERS_BY_CUSTOMER_SUCCESS = "FETCH_ORDERS_BY_CUSTOMER_SUCCESS";
export const FETCH_ORDERS_BY_CUSTOMER_ERROR = "FETCH_ORDERS_BY_CUSTOMER_ERROR";



export const fetchAllOrders = () => {
    return (dispatch) => {
        dispatch({
            type: FETCH_ORDERS_START
        });

        return axios.get("/orders")
            .then(res => {
                console.log({res});
                dispatch({
                    type: FETCH_ORDERS_SUCCESS,
                    data: res.data
                })
            })
            .catch(err => {
                console.log(err.response);
                dispatch({
                    type: FETCH_ORDERS_ERROR,
                    error: err.response.data
                })
            })
    }
};

export const sortOrders = () => {
    return {
        type: SORT_ORDERS
    }
};

export const searchOrderById = (orderId) => {
    return {
        type: SEARCH_ORDER_BY_ID,
        orderId
    }
};

export const showOrdersByCustomer = () => {
    return {
        type: SHOW_ORDERS_BY_CUSTOMER
    }
};

export const showAllOrders = () => {
    return {
        type: SHOW_ALL_ORDERS
    }
};

export const fetchOrdersByCustomer = () => {
    return (dispatch) => {

        dispatch({
            type: FETCH_ORDERS_BY_CUSTOMER_START
        });


        return axios.get("/orders/by-user")
            .then(res => {
                console.log("***********");
                console.log({res});
                const orders = res.data.orders
                dispatch({
                    type: FETCH_ORDERS_BY_CUSTOMER_SUCCESS,
                    orders
                })
            })
            .catch(err => {
                dispatch({
                    type: FETCH_ORDERS_BY_CUSTOMER_SUCCESS,
                })
            })
    }
};