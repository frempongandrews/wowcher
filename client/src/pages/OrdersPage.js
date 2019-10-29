import React, { Component } from "react";
import PropTypes from "prop-types";
import "../css/OrdersPage.css";


class OrdersPage extends Component {

    render () {

        const { orders, onSortOrders } = this.props;

        let ordersItems = orders.map(order => {
           return (
               <div className="table-row" key={order.orderId}>
                   <li>{order.orderId}</li>
                   <li>{order.user.name}</li>
                   <li>{order.product.productName}</li>
               </div>
           )
        });

        return (
            <div id="orders-page" className="anim">
                <div className="page-header">
                    <h3 className="title">Orders</h3>
                </div>

                <div className="search">
                    <input placeholder="Search"/>
                </div>


                <div id="orders-table">

                    <div className="nav">
                        <li>All orders</li>
                    </div>

                    <div className="fields">
                        <li>
                            <span>OrderId
                                <i className="fa fa-caret-up" aria-hidden="true"
                                   title="Sort By Id"
                                   onClick={() => onSortOrders()}/>
                            </span>
                        </li>
                        <li>Customer</li>
                        <li>Products</li>
                    </div>


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