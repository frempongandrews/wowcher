import {FETCH_ORDERS_ERROR, FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS} from "../actions/ordersActions";

let initialState = {
    orders: [],
    ordersCount: 0,
    currentOrder : null,

    isFetchingOrders: false,
    isFinishedFetchingOrders: false,
    areOrdersFetched: false,

    error: {},
    successMsg: ""
};

const ordersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_ORDERS_START:
            return {
                ...state,
                isFetchingOrders: true,
                isFinishedFetchingOrders: false,
                areOrdersFetched: false,
            };

        case FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                isFetchingOrders: false,
                isFinishedFetchingOrders: true,
                areOrdersFetched: true,
                orders: action.data.orders,
                ordersCount: action.data.ordersCount

            };

        case FETCH_ORDERS_ERROR:
            return {
                ...state,
                isFetchingOrders: false,
                isFinishedFetchingOrders: true,
                areOrdersFetched: false,
                error: action.error
            };

        default:
            return state;
    }
};

export default ordersReducer;