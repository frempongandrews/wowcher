import React, { Component } from "react";
import "../css/CustomersPage.css";


class CustomersPage extends Component {

    render () {

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
                        <li onClick={null} className={`active-list`}>All Customers <span className="count">2</span></li>
                    </div>

                    {/*Table fields*/}

                    <div className="fields">
                        <li className="customer-id">
                            <span>CustomerId

                                {
                                    <i className="fa fa-caret-up" aria-hidden="true"
                                       title="Sort By Id"
                                       onClick={this.onSortAllProductsById}/>
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

                            <div className="table-row">
                                <li>product.productId</li>
                                <li>product.productName</li>
                                <li>product.orderCount</li>
                            </div>

                        </div>

                    </div>
                    {/* /content*/}


                </div>
                {/* /customers table*/}
            </div>
        )

    }
}

export default CustomersPage;