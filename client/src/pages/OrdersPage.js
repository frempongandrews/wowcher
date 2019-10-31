import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../css/OrdersPage.css";
import OrdersByCustomerList from "../components/OrdersPage/OrdersByCustomerList";
import {
    fetchOrdersByOneCustomer,
    searchOrderById, setCurrentCustomerName, setCurrentCustomerOrders, showAllOrders, showOrdersByCustomer,
    sortOrdersByCustomerByOrderId, sortOrdersById
} from "../actions/ordersActions";


class OrdersPage extends Component {

    state = {
        searchText: "",
        errorMsg: ""
    };

    showCustomerTotalOrders = async (e) => {
        // console.log(e.target.title);
        //set current customer name
        const { dispatch } = this.props;
        let selectedCustomerName = e.target.innerText;
        await dispatch(setCurrentCustomerName(selectedCustomerName));
        await dispatch(fetchOrdersByOneCustomer(selectedCustomerName));

        //todo: optimise by caching call results in localStorage

    };

    hideCustomerTotalOrders = async () => {
        //set current customer name to null
        const { dispatch } = this.props;
        await dispatch(setCurrentCustomerName());
        await dispatch(setCurrentCustomerOrders());
    };

    onChange = (e) => {
        if (e.target.name === "orderNumber") {

            if (e.target.value === 0) {
                return;
            }

            //if it's a number
            if (!isNaN(Number(e.target.value))) {
                this.setState({
                    searchText: Number(e.target.value),
                    errorMsg: ""
                }, () => {
                    this.props.dispatch(searchOrderById(this.state.searchText));
                })
            }

            //if it's NOT a number
            if (isNaN(Number(e.target.value))) {
                this.setState({
                    errorMsg: "Please insert a valid order id"
                })
            }
        }
    };

    render () {

        // console.log(this.state);

        const { orders, ordersCount, ordersSortOrder, searchedOrders, listToShow, ordersByCustomerSortOrder,
            currentCustomerOrders, currentCustomerName  } = this.props;
        let ordersItems = [];
        let searchedOrdersItems = [];

        if (this.state.searchText === 0 ||  typeof(this.state.searchText) === "string") {
             ordersItems = orders.map(order => {
                return (
                    <div className="table-row" key={order.orderId}>
                        <li>{order.orderId}</li>
                        <li className="customer-name">
                            <span
                                onMouseEnter={this.showCustomerTotalOrders}
                                onMouseLeave={this.hideCustomerTotalOrders}
                                title={`${currentCustomerName.trim().toLowerCase() === order.user.name.trim().toLowerCase() && currentCustomerOrders !== null ? order.user.name + "'s total orders " + currentCustomerOrders : "" }`}>{order.user.name}</span>
                        </li>
                        <li>{order.product.productName}</li>
                    </div>
                )
            });
        }

        if (typeof (this.state.searchText) === "number") {
            searchedOrdersItems = searchedOrders.map(order => {
                return (
                    <div className="table-row" key={order.orderId}>
                        <li>{order.orderId}</li>
                        <li>{order.user.name}</li>
                        <li>{order.product.productName}</li>
                    </div>
                )
            });
        }


        return (
            <div id="orders-page" className="anim">
                <div className="page-header">
                    <h3 className="title">Orders</h3>
                </div>

                <div className="search">
                    <div>
                        <input placeholder="Search order id" name="orderNumber" onChange={this.onChange}/>
                        <span><i className="fa fa-search" aria-hidden="true" /></span>
                    </div>
                    {
                        this.state.errorMsg.trim().length > 0 &&
                        <label>{this.state.errorMsg}</label>
                    }

                </div>



                {/*orders-table*/}
                <div id="orders-table">

                    <div className="nav">
                        <li
                            className={`${listToShow === "ALL_ORDERS" ? "active-nav-item" : ""}`}
                            onClick={() => this.props.dispatch(showAllOrders())}>
                            All orders <span className="count">{ordersCount}</span>
                        </li>
                        <li
                            className={`${listToShow === "ORDERS_BY_CUSTOMER" ? "active-nav-item" : ""}`}
                            onClick={() => this.props.dispatch(showOrdersByCustomer())}>
                            Orders by customer</li>
                    </div>



                    {/*fields*/}
                    <div className="fields">

                        {
                            listToShow === "ALL_ORDERS" &&
                            <div>
                                <li>
                                    <span>OrderId

                                        {
                                            ordersSortOrder === "ASC" &&
                                            <i className="fa fa-caret-up" aria-hidden="true"
                                               title="Sort by id"
                                               onClick={() => this.props.dispatch(sortOrdersById())}/>
                                        }

                                        {
                                            ordersSortOrder === "DSC" &&
                                            <i className="fa fa-caret-down" aria-hidden="true"
                                               title="Sort By Id"
                                               onClick={() => this.props.dispatch(sortOrdersById())}/>
                                        }

                                    </span>
                                </li>
                                <li>Customer Name</li>
                                <li>Products</li>
                            </div>
                        }




                        {
                            listToShow === "ORDERS_BY_CUSTOMER" &&
                            <div className="table-row orders-by-customer-table-row">
                                <li>
                                    <span>Num of orders
                                        {
                                            ordersByCustomerSortOrder === "ASC" &&
                                            <i className="fa fa-caret-up" aria-hidden="true"
                                               title="Sort by number of orders"
                                               onClick={() => this.props.dispatch(sortOrdersByCustomerByOrderId())}/>
                                        }

                                        {
                                            ordersByCustomerSortOrder === "DSC" &&
                                            <i className="fa fa-caret-down" aria-hidden="true"
                                               title="Sort by number of orders"
                                               onClick={() => this.props.dispatch(sortOrdersByCustomerByOrderId())}/>
                                        }

                                    </span>
                                </li>

                                <li>Customer name</li>
                            </div>
                        }

                    </div>
                    {/*/ fields*/}


                    {/*content*/}

                    {/*all orders*/}
                    {
                        listToShow === "ALL_ORDERS" &&
                        <div>

                            {
                                (typeof this.state.searchText === "number") &&
                                searchedOrdersItems.length > 0 &&
                                searchedOrdersItems
                            }

                            {
                                (typeof this.state.searchText === "number") &&
                                this.state.searchText !== 0 &&
                                searchedOrdersItems.length === 0 &&
                                <p className="no-order-found">No order found</p>
                            }


                            {ordersItems}

                        </div>
                    }
                    {/* /all orders*/}

                    {/*orders by customer*/}
                    {
                        listToShow === "ORDERS_BY_CUSTOMER" &&
                        <OrdersByCustomerList/>
                    }
                    {/* /orders by customer*/}

                    {/* /content*/}



                </div>
                {/*orders-table*/}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        ordersCount: state.orders.ordersCount,
        customers: state.customers.customers,
        customersCount: state.customers.customersCount,
        products: state.products.products,
        productsCount: state.products.productsCount,
        ordersSortOrder: state.orders.ordersSortOrder,
        searchedOrders: state.orders.searchedOrders,
        listToShow: state.orders.listToShow,
        ordersByCustomerSortOrder: state.orders.ordersByCustomerSortOrder,
        currentCustomerName: state.orders.currentCustomerName,
        currentCustomerOrders: state.orders.currentCustomerOrders
    }
};

OrdersPage.propTypes = {
    orders: PropTypes.array.isRequired,
    ordersCount: PropTypes.number.isRequired,
    ordersSortOrder: PropTypes.string.isRequired,
    searchedOrders: PropTypes.array.isRequired,
    listToShow: PropTypes.string.isRequired,


};

export default connect(mapStateToProps)(OrdersPage);