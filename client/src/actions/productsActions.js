import axios from "axios"

export const FETCH_PRODUCTS_START = "FETCH_PRODUCTS_START";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";
export const SEARCH_PRODUCT_BY_ID = "SEARCH_PRODUCT_BY_ID";
export const SEARCH_PRODUCT_BY_NAME = "SEARCH_PRODUCT_BY_NAME";
export const SHOW_POPULAR_PRODUCTS = "SHOW_POPULAR_PRODUCTS";
export const SHOW_ALL_PRODUCTS = "SHOW_ALL_PRODUCTS";
export const FETCH_POPULAR_PRODUCTS_START = "FETCH_POPULAR_PRODUCTS_START";
export const FETCH_POPULAR_PRODUCTS_SUCCESS = "FETCH_POPULAR_PRODUCTS_SUCCESS";
export const FETCH_POPULAR_PRODUCTS_ERROR = "FETCH_POPULAR_PRODUCTS_ERROR";
export const SORT_ALL_PRODUCTS_BY_ID = "SORT_ALL_PRODUCTS_BY_ID";
export const SORT_POPULAR_PRODUCTS_BY_ORDER_COUNT = "SORT_POPULAR_PRODUCTS_BY_ORDER_COUNT";


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

export const showPopularProducts = () => {
    return {
        type: SHOW_POPULAR_PRODUCTS
    }
};

export const showAllProducts = () => {
    return {
        type: SHOW_ALL_PRODUCTS
    }
};

export const fetchPopularProducts = () => {
    return (dispatch) => {
        dispatch({
           type: FETCH_POPULAR_PRODUCTS_START
        });
        return axios.get("/products/popular")
            .then(res => {
                // console.log({res});
                dispatch({
                    type: FETCH_POPULAR_PRODUCTS_SUCCESS,
                    products: res.data.products
                });
            })
            .catch(err => {
                // console.log(err.response)
                dispatch({
                    type: FETCH_POPULAR_PRODUCTS_ERROR
                });
            })
    }
};

export const sortAllProductsById = () => {
    return{
        type: SORT_ALL_PRODUCTS_BY_ID
    }
};

export const sortPopularProductsByOrderCount = () => {
    return {
        type: SORT_POPULAR_PRODUCTS_BY_ORDER_COUNT
    }
};
