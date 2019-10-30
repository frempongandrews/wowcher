import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/OrdersPage.css";
import OrdersByCustomerList from "../components/OrdersPage/OrdersByCustomerList";


class OrdersPage extends Component {

    state = {
        searchText: "",
        errorMsg: ""
    };
    onChange = (e) => {
        if (e.target.name = "orderNumber") {

            if (e.target.value === 0) {
                return;
            }

            //if it's a number
            if (!isNaN(Number(e.target.value))) {
                this.setState({
                    searchText: Number(e.target.value),
                    errorMsg: ""
                }, () => {
                    this.props.onSearchOrderById(this.state.searchText);
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

        const { orders, ordersCount, onSortOrders, ordersSortOrder, searchedOrders, onShowOrdersByCustomer,
            listToShow, onShowAllOrders } = this.props;
        let ordersItems = [];
        let searchedOrdersItems = [];

        if (this.state.searchText === 0 ||  typeof(this.state.searchText) === "string") {
             ordersItems = orders.map(order => {
                return (
                    <div className="table-row" key={order.orderId}>
                        <li>{order.orderId}</li>
                        <li>{order.user.name}</li>
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
                            onClick={() => onShowAllOrders()}>
                            All orders <span className="count">{ordersCount}</span>
                        </li>
                        <li
                            className={`${listToShow === "ORDERS_BY_CUSTOMER" ? "active-nav-item" : ""}`}
                            onClick={() => onShowOrdersByCustomer()}>
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
                                               onClick={() => onSortOrders()}/>
                                        }

                                        {
                                            ordersSortOrder === "DSC" &&
                                            <i className="fa fa-caret-down" aria-hidden="true"
                                               title="Sort By Id"
                                               onClick={() => onSortOrders()}/>
                                        }

                                    </span>
                                </li>
                                <li>Customer</li>
                                <li>Products</li>
                            </div>
                        }




                        {
                            listToShow === "ORDERS_BY_CUSTOMER" &&
                            <div className="table-row orders-by-customer-table-row">
                                <li>
                                    <span>Num of orders
                                        <i className="fa fa-caret-up" aria-hidden="true"
                                           title="Sort by number of orders"
                                           onClick={null}/>
                                    </span>
                                </li>

                                <li>Customer name</li>
                            </div>
                        }

                    </div>
                    {/*/ fields*/}


                    {/*content*/}
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


                    {
                        listToShow === "ORDERS_BY_CUSTOMER" &&
                        <OrdersByCustomerList/>
                    }

                    {/* /content*/}



                </div>
                {/*orders-table*/}



            </div>
        )
    }
}

OrdersPage.propTypes = {
    orders: PropTypes.array.isRequired,
    ordersCount: PropTypes.number.isRequired,
    onSortOrders: PropTypes.func.isRequired,
    ordersSortOrder: PropTypes.string.isRequired,
    searchedOrders: PropTypes.array.isRequired,
    onShowOrdersByCustomer: PropTypes.func.isRequired,
    listToShow: PropTypes.string.isRequired,
    onShowAllOrders: PropTypes.func.isRequired
};

export default OrdersPage;