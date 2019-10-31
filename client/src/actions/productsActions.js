import axios from "axios"

export const FETCH_PRODUCTS_START = "FETCH_PRODUCTS_START";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";
export const SEARCH_PRODUCT_BY_ID = "SEARCH_PRODUCT_BY_ID";
export const SEARCH_PRODUCT_BY_NAME = "SEARCH_PRODUCT_BY_NAME";

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

export const searchProductById = (productId) => {
    return {
        type: SEARCH_PRODUCT_BY_ID,
        productId
    }
};

export const searchProductByName = (productName) => {
    return {
        type: SEARCH_PRODUCT_BY_NAME,
        productName
    }
};