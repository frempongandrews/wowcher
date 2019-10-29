import {FETCH_CUSTOMERS_ERROR, FETCH_CUSTOMERS_START, FETCH_CUSTOMERS_SUCCESS} from "../actions/customersActions";

let initialState = {
    customers: [],
    customersCount: 0,
    currentCustomer: null,

    isFetchingCustomers: false,
    isFinishedFetchingCustomers: true,
    areCustomersFetched: false,

    successMsg: "",
    error: {}
};

const customersReducer = (state=initialState, action) => {
    switch (action.type) {

        case FETCH_CUSTOMERS_START:
            return {
                ...state,
                isFetchingCustomers: true,
                isFinishedFetchingCustomers: true,
                areCustomersFetched: false,
            };

        case FETCH_CUSTOMERS_SUCCESS:
            return {
                ...state,
                isFetchingCustomers: false,
                isFinishedFetchingCustomers: true,
                areCustomersFetched: true,
                customers: action.data.customers,
                customersCount: action.data.customersCount
            };

        case FETCH_CUSTOMERS_ERROR:
            return {
                ...state,
                isFetchingCustomers: false,
                isFinishedFetchingCustomers: true,
                areCustomersFetched: false,
            };


        default:
            return state;
    }
};

export default customersReducer;