import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/OrdersPage.css";


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

        console.log(this.state);

        const { orders, onSortOrders, ordersSortOrder, searchedOrders } = this.props;
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


                <div id="orders-table">

                    <div className="nav">
                        <li>All orders</li>
                    </div>

                    <div className="fields">
                        <li>
                            <span>OrderId

                                {
                                    ordersSortOrder === "ASC" &&
                                    <i className="fa fa-caret-up" aria-hidden="true"
                                       title="Sort By Id"
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

            </div>
        )
    }
}

OrdersPage.propTypes = {
    orders: PropTypes.array.isRequired,
    onSortOrders: PropTypes.func.isRequired
};

export default OrdersPage;