import {FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_START, FETCH_PRODUCTS_SUCCESS} from "../actions/productsActions";

let initialState = {
    products: [],
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

        default:
            return state;
    }
};

export default productsReducer;