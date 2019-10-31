import {
    FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_START, FETCH_PRODUCTS_SUCCESS,
    SEARCH_PRODUCT_BY_ID, SEARCH_PRODUCT_BY_NAME
} from "../actions/productsActions";

let initialState = {
    products: [],
    searchedProducts: [],
    productsCount: 0,
    currentProduct: null,

    isFetchingProducts: false,
    isFinishedFetchingProducts: true,
    areProductsFetched: false,

    successMsg: "",
    error: {}
};

const productsReducer = (state=initialState, action) => {
    switch (action.type) {

        case FETCH_PRODUCTS_START:
            return {
                ...state,
                isFetchingProducts: true,
                isFinishedFetchingProducts: true,
                areProductsFetched: false,
            };

        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isFetchingProducts: false,
                isFinishedFetchingProducts: true,
                areProductsFetched: true,
                products: action.data.products,
                productsCount: action.data.productsCount
            };

        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                isFetchingProducts: false,
                isFinishedFetchingProducts: true,
                areProductsFetched: false,
            };

        case SEARCH_PRODUCT_BY_ID:
            return {
                ...state,
                searchedProducts: state.products.slice(0).filter(product => {
                    let searchedProductIdStr = action.productId + "";
                    let matchedProductIdStr = product.productId + "";

                    return matchedProductIdStr.indexOf(searchedProductIdStr) !== -1;
                })
            };

        case SEARCH_PRODUCT_BY_NAME:
            return {
                ...state,
                searchedProducts: state.products.slice(0).filter(product => {
                    let searchedProductName = action.productName;
                    let matchedProductName = product.productName;

                    return matchedProductName.indexOf(searchedProductName) !== -1;
                })
            };

        default:
            return state;
    }
};

export default productsReducer;