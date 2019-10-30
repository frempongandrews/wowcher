import {
    FETCH_ORDERS_BY_CUSTOMER_ERROR,
    FETCH_ORDERS_BY_CUSTOMER_START, FETCH_ORDERS_BY_CUSTOMER_SUCCESS,
    FETCH_ORDERS_ERROR, FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS, SEARCH_ORDER_BY_ID, SET_SORT_ORDERS_ORDER_BY_CUSTOMER,
    SHOW_ALL_ORDERS,
    SHOW_ORDERS_BY_CUSTOMER,
    SORT_ORDERS, SORT_ORDERS_BY_CUSTOMER
} from "../actions/ordersActions";


let listToShow = {
    allOrders: "ALL_ORDERS",
    ordersByCustomer: "ORDERS_BY_CUSTOMER"
};

let initialState = {
    orders: [],
    ordersCount: 0,
    ordersSortOrder: "ASC",
    searchedOrders: [],
    ordersByCustomer: [],
    ordersByCustomerSortOrder: "ASC",
    listToShow: listToShow.allOrders,
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
                }),
                listToShow: listToShow.allOrders
            };

        case SHOW_ORDERS_BY_CUSTOMER:
            return {
                ...state,
                listToShow: listToShow.ordersByCustomer
            };

        case SHOW_ALL_ORDERS:
            return {
                ...state,
                listToShow: listToShow.allOrders
            };

        case FETCH_ORDERS_BY_CUSTOMER_START:
            return{
                ...state,
                isFetchingOrders: true,
                isFinishedFetchingOrders: false,
                areOrdersFetched: false
            };

        case FETCH_ORDERS_BY_CUSTOMER_SUCCESS:
            return{
                ...state,
                isFetchingOrders: false,
                isFinishedFetchingOrders: true,
                areOrdersFetched: true,
                ordersByCustomer: action.orders
            };

        case FETCH_ORDERS_BY_CUSTOMER_ERROR:
            return{
                ...state,
                isFetchingOrders: false,
                isFinishedFetchingOrders: true,
                areOrdersFetched: false
            };

        case SORT_ORDERS_BY_CUSTOMER:
            if (state.ordersByCustomerSortOrder === "ASC") {
                return {
                    ...state,
                    ordersByCustomerSortOrder: "DSC",
                    ordersByCustomer: [...state.ordersByCustomer].reverse()
                }
            }

            if (state.ordersByCustomerSortOrder === "DSC") {
                return {
                    ...state,
                    ordersByCustomerSortOrder: "ASC",
                    ordersByCustomer: [...state.ordersByCustomer].reverse()
                }
            }
            break;

        case SET_SORT_ORDERS_ORDER_BY_CUSTOMER:
            return {
                ...state,
                ordersByCustomerSortOrder: action.order
            };

        default:
            return state;
    }
};

export default ordersReducer;