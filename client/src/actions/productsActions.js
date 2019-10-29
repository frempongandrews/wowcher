import axios from "axios"

export const FETCH_PRODUCTS_START = "FETCH_PRODUCTS_START";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";

export const fetchAllProducts = () => {
    return (dispatch) => {

        dispatch({
            type: FETCH_PRODUCTS_START
        });

        return axios.get("/products")
            .then(res => {
                dispatch({
                    type: FETCH_PRODUCTS_SUCCESS,
                    data: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: FETCH_PRODUCTS_ERROR,
                    error: err.response.data
                })
            })
    }
};