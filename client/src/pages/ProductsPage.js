import React, { Component } from "react";
import "../css/ProductsPage.css";


class ProductsPage extends Component {

    render () {

        return (
            <div id="products-page" className="anim">
                <div className="page-header">
                    <h3 className="title">Products</h3>
                    <div>
                        <button>Add Product</button>
                    </div>
                </div>

                <div className="search">
                    <div>
                        <input placeholder="Search product id" name="orderNumber" onChange={this.onChange}/>
                        <span><i className="fa fa-search" aria-hidden="true" /></span>
                    </div>

                </div>


                <div id="orders-table">

                    <div className="nav">
                        <li>All Products</li>
                        <li>Most popular</li>
                    </div>

                    <div className="fields">
                        <li>
                            <span>ProductId

                                {

                                    <i className="fa fa-caret-up" aria-hidden="true"
                                       title="Sort By Id"
                                       onClick={null}/>
                                }

                                {/*{*/}
                                    {/**/}
                                    {/*<i className="fa fa-caret-down" aria-hidden="true"*/}
                                       {/*title="Sort By Id"*/}
                                       {/*onClick={null}/>*/}
                                {/*}*/}

                            </span>
                        </li>
                        <li>ProductName</li>
                        <li>Customers</li>
                    </div>


                    {/*{ordersItems}*/}

                    <div className="table-row" key={1}>
                        <li>productId</li>
                        <li>productName</li>
                        <li>Customers</li>
                    </div>


                </div>
            </div>
        )
    }
}

export default ProductsPage;