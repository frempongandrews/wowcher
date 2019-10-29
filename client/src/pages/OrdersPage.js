import React, { Component } from "react";
import "../css/OrdersPage.css";


class OrdersPage extends Component {

    render () {

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
                        <li>OrderId</li>
                        <li>Customer</li>
                        <li>Products</li>
                    </div>

                    {/*order item*/}
                    <div className="table-row">
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                    </div>
                    {/* /order item*/}

                    {/*order item*/}
                    <div className="table-row">
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                    </div>
                    {/* /order item*/}

                    {/*order item*/}
                    <div className="table-row">
                        <li>test</li>
                        <li>test</li>
                        <li>test</li>
                    </div>
                    {/* /order item*/}

                </div>

            </div>
        )
    }
}

export default OrdersPage;