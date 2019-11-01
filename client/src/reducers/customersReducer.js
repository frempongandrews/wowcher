import {
    FETCH_CUSTOMERS_ERROR, FETCH_CUSTOMERS_START, FETCH_CUSTOMERS_SUCCESS,
    SORT_ALL_CUSTOMERS_BY_ID, SORT_ALL_CUSTOMERS_BY_NAME
} from "../actions/customersActions";

let initialState = {
    customers: [],
    customersSortOrder: "ASC",
    customersSortOrderByName: "ASC",
    searchedCustomers: [],
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

        case SORT_ALL_CUSTOMERS_BY_ID:
            if (state.customersSortOrder === "ASC") {
                return {
                    ...state,
                    customersSortOrder: "DSC",
                    customers: state.customers.slice(0).sort((a,b) => {
                        return b.userId - a.userId
                    })
                };
            }

            if (state.customersSortOrder === "DSC") {
                return {
                    ...state,
                    customersSortOrder: "ASC",
                    customers: state.customers.slice(0).sort((a,b) => {
                        return a.userId - b.userId
                    })
                };
            }

            break;

        case SORT_ALL_CUSTOMERS_BY_NAME:
            if (state.customersSortOrderByName === "ASC") {
                return {
                    ...state,
                    customersSortOrderByName: "DSC",
                    customers: state.customers.slice(0).reverse()
                };
            }

            if (state.customersSortOrderByName === "DSC") {
                return {
                    ...state,
                    customersSortOrderByName: "ASC",
                    customers: state.customers.slice(0).reverse()
                };
            }

            break;

        default:
            return state;
    }
};

export default customersReducer;