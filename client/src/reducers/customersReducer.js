import {
    FETCH_CUSTOMERS_ERROR, FETCH_CUSTOMERS_START, FETCH_CUSTOMERS_SUCCESS, SEARCH_CUSTOMER_BY_ID,
    SEARCH_CUSTOMER_BY_NAME,
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
                    }),
                    searchedCustomers: state.searchedCustomers.slice(0).sort((a,b) => {
                        return b.userId - a.userId
                    }),
                };
            }

            if (state.customersSortOrder === "DSC") {
                return {
                    ...state,
                    customersSortOrder: "ASC",
                    customers: state.customers.slice(0).sort((a,b) => {
                        return a.userId - b.userId
                    }),
                    searchedCustomers: state.searchedCustomers.slice(0).sort((a,b) => {
                        return b.userId - a.userId
                    }),
                };
            }

            break;

        case SORT_ALL_CUSTOMERS_BY_NAME:

            let sortByName = (order) => {
                return (a, b) => {
                    let comparison = 0;
                    if (a.name.toUpperCase() < b.name.toUpperCase()) {
                        comparison = -1;
                    }

                    if (a.name.toUpperCase() > b.name.toUpperCase()) {
                        comparison = 1;
                    }

                    return order === "asc" ? comparison : comparison *-1;
                }
            };

            if (state.customersSortOrderByName === "ASC") {
                return {
                    ...state,
                    customersSortOrderByName: "DSC",
                    customers: state.customers.slice(0).sort(sortByName("dsc")),
                    searchedCustomers: state.searchedCustomers.slice(0).sort(sortByName("dsc")),
                };
            }

            if (state.customersSortOrderByName === "DSC") {
                return {
                    ...state,
                    customersSortOrderByName: "ASC",
                    customers: state.customers.slice(0).sort(sortByName("asc")),
                    searchedCustomers: state.searchedCustomers.slice(0).sort(sortByName("asc")),
                };
            }

            break;

        case SEARCH_CUSTOMER_BY_ID: {
            return {
                ...state,
                searchedCustomers: state.customers.slice(0).filter(customer => {
                    let searchedIdStr = action.customerId + "";
                    let matchedCustomerIdStr = customer.userId + "";
                    return matchedCustomerIdStr.indexOf(searchedIdStr) !== -1;
                })
            }
        }

        case SEARCH_CUSTOMER_BY_NAME: {
            return {
                ...state,
                searchedCustomers: state.customers.slice(0).filter(customer => {
                    let searchedName = action.customerName;
                    let matchedCustomerName = customer.name;
                    return matchedCustomerName.indexOf(searchedName) !== -1;
                })
            }
        }

        default:
            return state;
    }
};

export default customersReducer;