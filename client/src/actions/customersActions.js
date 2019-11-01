import axios from "axios"

export const FETCH_CUSTOMERS_START = "FETCH_CUSTOMERS_START";
export const FETCH_CUSTOMERS_SUCCESS = "FETCH_CUSTOMERS_SUCCESS";
export const FETCH_CUSTOMERS_ERROR = "FETCH_CUSTOMERS_ERROR";
export const SORT_ALL_CUSTOMERS_BY_ID = "SORT_ALL_CUSTOMERS_BY_ID";
export const SORT_ALL_CUSTOMERS_BY_NAME = "SORT_ALL_CUSTOMERS_BY_NAME";
export const SEARCH_CUSTOMER_BY_ID = "SEARCH_CUSTOMER_BY_ID";
export const SEARCH_CUSTOMER_BY_NAME = "SEARCH_CUSTOMER_BY_NAME";


export const fetchAllCustomers = () => {
    return (dispatch) => {

        dispatch({
            type: FETCH_CUSTOMERS_START
        });

        return axios.get("/users")
            .then(res => {
                dispatch({
                    type: FETCH_CUSTOMERS_SUCCESS,
                    data: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: FETCH_CUSTOMERS_ERROR,
                    error: err.response.data
                })
            })
    }
};

export const sortAllCustomersById = () => {
    return {
        type: SORT_ALL_CUSTOMERS_BY_ID
    }
};

export const sortAllCustomersByName = () => {
    return {
        type: SORT_ALL_CUSTOMERS_BY_NAME
    }
};

export const searchCustomerById = (customerId) => {
    return {
        type: SEARCH_CUSTOMER_BY_ID,
        customerId
    }
};

export const searchCustomerByName = (customerName) => {
    return {
        type: SEARCH_CUSTOMER_BY_NAME,
        customerName
    }
};