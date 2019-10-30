import {
    FETCH_ORDERS_ERROR, FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS, SEARCH_ORDER_BY_ID,
    SORT_ORDERS
} from "../actions/ordersActions";

let initialState = {
    orders: [],
    searchedOrders: [],
    ordersCount: 0,
    ordersSortOrder: "ASC",
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

        case SORT_ORDERS:
            if (state.ordersSortOrder === "ASC") {
                return {
                    ...state,
                    ordersSortOrder: "DSC",
                    orders: [...state.orders].reverse()
                }
            }

            if (state.ordersSortOrder === "DSC") {
                return {
                    ...state,
                    ordersSortOrder: "ASC",
                    orders: [...state.orders].reverse()
                }
            }

            break;

        case SEARCH_ORDER_BY_ID:
            return {
                ...state,
                searchedOrders: state.orders.slice(0).filter(order => {
                    return order.orderId === action.orderId
                })
            };

        default:
            return state;
    }
};

export default ordersReducer;