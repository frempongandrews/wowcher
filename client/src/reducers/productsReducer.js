import {
    FETCH_POPULAR_PRODUCTS_ERROR,
    FETCH_POPULAR_PRODUCTS_START, FETCH_POPULAR_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_START, FETCH_PRODUCTS_SUCCESS,
    SEARCH_PRODUCT_BY_ID, SEARCH_PRODUCT_BY_NAME, SHOW_ALL_PRODUCTS, SHOW_POPULAR_PRODUCTS
} from "../actions/productsActions";
import {SHOW_ALL_ORDERS} from "../actions/ordersActions";

export const LIST_TO_SHOW = {
    allProducts: "ALL_PRODUCTS",
    popular: "POPULAR"
};

let initialState = {
    products: [],
    popularProducts: [],
    listToShow: LIST_TO_SHOW.allProducts,
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
                }),
                listToShow: LIST_TO_SHOW.allProducts
            };

        case SEARCH_PRODUCT_BY_NAME:
            return {
                ...state,
                searchedProducts: state.products.slice(0).filter(product => {
                    let searchedProductName = action.productName;
                    let matchedProductName = product.productName;

                    return matchedProductName.indexOf(searchedProductName) !== -1;
                }),
                listToShow: LIST_TO_SHOW.allProducts
            };

        case SHOW_ALL_PRODUCTS:
            return {
                ...state,
                listToShow: LIST_TO_SHOW.allProducts
            };

        case SHOW_POPULAR_PRODUCTS:
            return {
                ...state,
                listToShow: LIST_TO_SHOW.popular
            };

        case FETCH_POPULAR_PRODUCTS_START:
            return {
                ...state,
                isFetchingProducts: true,
                isFinishedFetchingProducts: false,
                areProductsFetched: false
            };

        case FETCH_POPULAR_PRODUCTS_SUCCESS:
            return {
                ...state,
                isFetchingProducts: false,
                isFinishedFetchingProducts: true,
                areProductsFetched: true,
                popularProducts: action.products
            };

        case FETCH_POPULAR_PRODUCTS_ERROR:
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