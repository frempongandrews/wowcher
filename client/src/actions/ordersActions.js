import axios from "axios";

export const FETCH_ORDERS_START = "FETCH_ORDERS_START";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_ERROR = "FETCH_ORDERS_ERROR";
export const SORT_ORDERS_BY_ID = "SORT_ORDERS_BY_ID";
export const SEARCH_ORDER_BY_ID = "SEARCH_ORDER_BY_ID";
export const SHOW_ORDERS_BY_CUSTOMER = "SHOW_ORDERS_BY_CUSTOMER";
export const SHOW_ALL_ORDERS = "SHOW_ALL_ORDERS";
export const FETCH_ORDERS_BY_CUSTOMER_START = "FETCH_ORDERS_BY_CUSTOMER_START";
export const FETCH_ORDERS_BY_CUSTOMER_SUCCESS = "FETCH_ORDERS_BY_CUSTOMER_SUCCESS";
export const FETCH_ORDERS_BY_CUSTOMER_ERROR = "FETCH_ORDERS_BY_CUSTOMER_ERROR";
export const SORT_ORDERS_BY_CUSTOMER_BY_ORDER_ID = "SORT_ORDERS_BY_CUSTOMER_BY_ORDER_ID";
export const SET_SORT_ORDERS_ORDER_BY_CUSTOMER = "SET_SORT_ORDER_BY_CUSTOMER";
export const FETCH_ORDERS_BY_ONE_CUSTOMER_START = "FETCH_ORDERS_BY_ONE_CUSTOMER_START";
export const FETCH_ORDERS_BY_ONE_CUSTOMER_SUCCESS = "FETCH_ORDERS_BY_ONE_CUSTOMER_SUCCESS";
export const FETCH_ORDERS_BY_ONE_CUSTOMER_ERROR = "FETCH_ORDERS_BY_ONE_CUSTOMER_ERROR";
export const SET_CURRENT_CUSTOMER_NAME = "SET_CURRENT_CUSTOMER_NAME";
export const SET_CURRENT_CUSTOMER_ORDERS = "SET_CURRENT_CUSTOMER_ORDERS";


export const fetchAllOrders = () => {
    return (dispatch) => {
        dispatch({
            type: FETCH_ORDERS_START
        });

        return axios.get("/orders")
            .then(res => {
                // console.log({res});
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

export const sortOrdersById = () => {
    return {
        type: SORT_ORDERS_BY_ID
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
                const { orders } = res.data;
                dispatch({
                    type: FETCH_ORDERS_BY_CUSTOMER_SUCCESS,
                    orders
                })
            })
            .catch(err => {
                console.log(err.response);
                dispatch({
                    type: FETCH_ORDERS_BY_CUSTOMER_ERROR,
                })
            })
    }
};

export const setCurrentCustomerName = (name) => {
    return {
        type: SET_CURRENT_CUSTOMER_NAME,
        name
    }
};

export const setCurrentCustomerOrders = (value) => {
    return {
        type: SET_CURRENT_CUSTOMER_ORDERS,
        value
    }
};

export const fetchOrdersByOneCustomer = (customerName) => {
    return (dispatch) => {
        dispatch({
            type: FETCH_ORDERS_BY_ONE_CUSTOMER_START
        });
        return axios.get(`/orders/user/${customerName}`)
            .then(res => {
                console.log({res});
                dispatch({
                    type: FETCH_ORDERS_BY_ONE_CUSTOMER_SUCCESS,
                    ordersCount: res.data.ordersByCustomer
                })
            })
            .catch(err => {
                console.log(err.response);
                dispatch({
                    type: FETCH_ORDERS_BY_ONE_CUSTOMER_ERROR,
                })
            })
    }
};

export const sortOrdersByCustomerByOrderId = () => {
    return {
        type: SORT_ORDERS_BY_CUSTOMER_BY_ORDER_ID
    }
};

export const setSortOrdersOrderByCustomer = (order) => {
    return {
        type: SET_SORT_ORDERS_ORDER_BY_CUSTOMER,
        order
    }
};