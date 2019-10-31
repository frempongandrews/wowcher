import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../css/ProductsPage.css";
import {
    fetchAllProducts, searchProductById, searchProductByName, showAllProducts,
    showPopularProducts, sortAllProductsById
} from "../actions/productsActions";
import {LIST_TO_SHOW} from "../reducers/productsReducer";
import PopularProducts from "../components/ProductsPage/PopularProducts";


class ProductsPage extends Component {

    state = {
        searchText: "",
    };

    async componentDidMount () {
        const { dispatch } = this.props;
        await dispatch(fetchAllProducts());
    }

    onShowAllProducts = () => {
        const { dispatch } = this.props;
        dispatch(showAllProducts());
    };

    onShowPopularProducts = () => {
        const { dispatch } = this.props;
        dispatch(showPopularProducts());
    };

    onSortAllProductsById = () => {
        const { dispatch } = this.props;
        dispatch(sortAllProductsById());
    };

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

        const { products, searchedProducts, productsCount, listToShow } = this.props;

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
                        <li onClick={this.onShowAllProducts} className={`${listToShow === LIST_TO_SHOW.allProducts ? "active-list" : ""}`}>All Products <span className="count">{productsCount}</span></li>
                        <li onClick={this.onShowPopularProducts} className={`${listToShow === LIST_TO_SHOW.popular ? "active-list" : ""}`}>Popular</li>
                    </div>



                    {/*Table fields*/}

                    {/*All Products fields*/}
                    {
                        listToShow === LIST_TO_SHOW.allProducts &&
                        <div className="fields">
                            <li>
                                <span>ProductId

                                    {

                                        <i className="fa fa-caret-up" aria-hidden="true"
                                           title="Sort By Id"
                                           onClick={this.onSortAllProductsById}/>
                                    }

                                </span>
                            </li>
                            <li>ProductName</li>
                            <li>N. times ordered</li>
                            <li>Ordered by</li>
                        </div>
                    }
                    {/* /All Products fields*/}

                    {/*Popular Products fields*/}
                    {
                        listToShow === LIST_TO_SHOW.popular &&
                        <div className="fields popular-fields">
                            <li>
                                <span>ProductId</span>
                            </li>
                            <li>ProductName</li>
                            <li id="number-of-times-title">
                                <span>N. times ordered
                                    {

                                        <i className="fa fa-caret-up" aria-hidden="true"
                                           title="Sort By Id"
                                           onClick={null}/>
                                    }
                                </span>
                            </li>
                            <li>Ordered by</li>
                        </div>
                    }
                    {/* /Popular Products fields*/}

                    {/* /Table fields*/}


                    {/*content*/}
                    <div>

                        {/*All Products content*/}
                        {
                           listToShow === LIST_TO_SHOW.allProducts&&
                           <div>
                               {
                                   this.state.searchText.trim() === "" &&
                                   productItems
                               }

                               {
                                   typeof (this.state.searchText.trim() === "string") &&
                                   searchedProductsItems
                               }

                           </div>

                        }
                        {/* /All Products content*/}

                        {/*All Popular content*/}
                        {
                            listToShow === LIST_TO_SHOW.popular &&
                            <PopularProducts/>
                        }

                        {/* /All Popular content*/}

                    </div>
                    {/* /content*/}


                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        searchedProducts: state.products.searchedProducts,
        productsCount: state.products.productsCount,
        listToShow: state.products.listToShow
    }
};

ProductsPage.propTypes = {
    products: PropTypes.array.isRequired,
    searchedProducts: PropTypes.array.isRequired,
    listToShow: PropTypes.string.isRequired,
    productsCount: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(ProductsPage);