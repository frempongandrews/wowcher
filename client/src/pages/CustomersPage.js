import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../css/CustomersPage.css";
import {fetchAllCustomers, sortAllCustomersById} from "../actions/customersActions";


class CustomersPage extends Component {

    state = {
        searchText: ""
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchAllCustomers());
    }

    onChange = (e) => {

    };

    onSortAllCustomersById = () => {
        const { dispatch } = this.props;
        dispatch(sortAllCustomersById());
    };

    render () {
        const { customers, customersSortOrder, searchedCustomers, customersCount } = this.props;


        const customersItems = customers.map(customer => {
            return (
                <div className="table-row" key={customer.userId}>
                    <li>{customer.userId}</li>
                    <li>{customer.name}</li>
                    <li>{customer.email}</li>
                </div>
            )
        });

        return (
            <div id="customers-page" className="anim">
                <div className="page-header">
                    <h3 className="title">Customers</h3>

                </div>

                <div className="search">
                    <div>
                        <input placeholder="Search customer" name="product" onChange={this.onChange}/>
                        <span><i className="fa fa-search" aria-hidden="true" /></span>
                    </div>

                </div>


                <div id="customers-table">

                    <div className="nav">
                        <li onClick={null} className={`active-list`}>All Customers <span className="count">{customersCount}</span></li>
                    </div>

                    {/*Table fields*/}

                    <div className="fields">
                        <li className="customer-id">
                            <span>CustomerId

                                {
                                    <i className="fa fa-caret-up" aria-hidden="true"
                                       title="Sort By Id"
                                       onClick={this.onSortAllCustomersById}/>
                                }

                            </span>
                        </li>
                        <li className="customer-name">CustomerName
                            <span>

                                {
                                    <i className="fa fa-caret-up" aria-hidden="true"
                                       title="Sort By Id"
                                       onClick={null}/>
                                }

                                </span>
                        </li>
                        <li>Email</li>
                    </div>

                    {/* /All Products fields*/}

                    {/*content*/}
                    <div>

                        <div>
                            {/*{*/}
                                {/*this.state.searchText.trim() === "" &&*/}
                                {/*productItems*/}
                            {/*}*/}

                            {/*{*/}
                                {/*typeof (this.state.searchText.trim() === "string") &&*/}
                                {/*searchedProductsItems*/}
                            {/*}*/}

                            {customersItems}

                        </div>

                    </div>
                    {/* /content*/}


                </div>
                {/* /customers table*/}
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.customers.customers,
        customersSortOrder: state.customers.customersSortOrder,
        searchedCustomers: state.customers.searchedCustomers,
        customersCount: state.customers.customersCount
    }
};

CustomersPage.propType = {
    customers: PropTypes.array.isRequired,
    customersSortOrder: PropTypes.string.isRequired,
    searchedCustomers: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(CustomersPage);