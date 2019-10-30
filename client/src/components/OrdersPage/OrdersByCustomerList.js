import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {fetchOrdersByCustomer} from "../../actions/ordersActions";

class OrdersByCustomerList extends Component{

    componentDidMount() {
        // alert("mounted");
        const { dispatch } = this.props;
        dispatch(fetchOrdersByCustomer());
    }
    render () {

        const { ordersByCustomer } = this.props;

        const ordersByCustomerItems = ordersByCustomer.map((orderNumAndCustomer, i) => {
            return (
                <div className="table-row" key={i}>
                    <li>{orderNumAndCustomer.orderCount}</li>

                    <li>{orderNumAndCustomer.customerName}</li>
                </div>
            )
        });

        return (
            <div>

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