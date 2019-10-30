import React, { Component } from "react";
import "../../css/OrdersByCustomerList.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {fetchOrdersByCustomer, setSortOrdersOrderByCustomer} from "../../actions/ordersActions";

class OrdersByCustomerList extends Component{

    async componentDidMount() {
        // alert("mounted");
        const { dispatch } = this.props;
        await dispatch(setSortOrdersOrderByCustomer("ASC"));
        await dispatch(fetchOrdersByCustomer());
    }
    render () {

        const { ordersByCustomer } = this.props;

        const ordersByCustomerItems = ordersByCustomer.map((orderNumAndCustomer, i) => {
            return (
                <div className="table-row table-row-orders-by-customer" key={i}>
                    <li>{orderNumAndCustomer.orderCount}</li>

                    <li>{orderNumAndCustomer.customerName}</li>
                </div>
            )
        });

        return (
            <div id="orders-by-customer-list">

                {ordersByCustomerItems}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ordersByCustomer: state.orders.ordersByCustomer,

    }
};

OrdersByCustomerList.propTypes = {
    ordersByCustomer: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(OrdersByCustomerList);