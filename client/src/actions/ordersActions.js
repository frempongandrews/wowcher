import axios from "axios";

export const FETCH_ORDERS_START = "FETCH_ORDERS_START";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_ERROR = "FETCH_ORDERS_ERROR";
export const SORT_ORDERS = "SORT_ORDERS";
export const SEARCH_ORDER_BY_ID = "SEARCH_ORDER_BY_ID";


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