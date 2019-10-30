import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../css/ProductsPage.css";
import {fetchAllProducts} from "../actions/productsActions";


class ProductsPage extends Component {

    async componentDidMount () {
        const { dispatch } = this.props;
        await dispatch(fetchAllProducts());
    }

    render () {

        const { products } = this.props;

        const productItems = products.map(product => {
            return (
                <div className="table-row" key={product.productId}>
                    <li>{product.productId}</li>
                    <li>{product.productName}</li>
                    <li>
                        {
                            product.customers.map((c, i) => {
                                return (
                                    <span key={i}>{c}</span>
                                )
                            })
                        }

                    </li>
                </div>
            )
        });

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

                            </span>
                        </li>
                        <li>ProductName</li>
                        <li>Customers</li>
                    </div>



                    {productItems}

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products
    }
};

ProductsPage.propTypes = {
    products: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(ProductsPage);