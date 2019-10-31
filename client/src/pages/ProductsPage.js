import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../css/ProductsPage.css";
import {fetchAllProducts, searchProductById, searchProductByName} from "../actions/productsActions";


class ProductsPage extends Component {

    state = {
        searchText: "",
    };

    async componentDidMount () {
        const { dispatch } = this.props;
        await dispatch(fetchAllProducts());
    }

    onChange = (e) => {
        const { dispatch } = this.props;
        //2 actions depending on value
        let valueEntered = e.target.value;
        if (e.target.name === "product") {
            //not a number => search through product names
            if (isNaN(Number(valueEntered))) {
                console.log("**********Not a number");
                this.setState({
                    searchText: valueEntered
                }, () => {
                    dispatch(searchProductByName((valueEntered)));
                });
            }
            //is a number => search through product ids
            if (!isNaN( Number(valueEntered))) {
                console.log("**********Is a number");
                this.setState({
                    searchText: valueEntered
                }, () => {
                    dispatch(searchProductById(Number(valueEntered)));
                });

            }
        }
    };

    render () {

        console.log(this.state);

        const { products, searchedProducts } = this.props;

        const searchedProductsItems = searchedProducts.map(product => {
            return (
                <div className="table-row" key={product.productId}>
                    <li>{product.productId}</li>
                    <li>{product.productName}</li>
                    <li>{product.orderCount}</li>
                    <li>
                        {
                            product.customers.map((c, i) => {
                                return (
                                    <p key={i}>{c}</p>
                                )
                            })
                        }

                    </li>
                </div>
            )
        });

        const productItems = products.map(product => {
            return (
                <div className="table-row" key={product.productId}>
                    <li>{product.productId}</li>
                    <li>{product.productName}</li>
                    <li>{product.orderCount}</li>
                    <li>
                        {
                            product.customers.map((c, i) => {
                                return (
                                    <p key={i}>{c}</p>
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
                        <input placeholder="Search product" name="product" onChange={this.onChange}/>
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
                        <li>Num times ordered</li>
                        <li>Ordered by</li>
                    </div>

                    {
                        this.state.searchText.trim() === "" &&
                        productItems
                    }

                    {
                        typeof (this.state.searchText.trim() === "string") &&
                        searchedProductsItems
                    }


                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        searchedProducts: state.products.searchedProducts
    }
};

ProductsPage.propTypes = {
    products: PropTypes.array.isRequired,
    searchedProducts: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(ProductsPage);