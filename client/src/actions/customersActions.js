import axios from "axios"

export const FETCH_CUSTOMERS_START = "FETCH_CUSTOMERS_START";
export const FETCH_CUSTOMERS_SUCCESS = "FETCH_CUSTOMERS_SUCCESS";
export const FETCH_CUSTOMERS_ERROR = "FETCH_CUSTOMERS_ERROR";

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