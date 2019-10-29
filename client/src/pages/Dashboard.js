import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "../assets/laptop.jpeg";
import rightArrow from "../assets/right-arrow.svg";
import "../css/Dashboard.css";
import {fetchAllOrders} from "../actions/ordersActions";
import {fetchAllProducts} from "../actions/productsActions";
import {fetchAllCustomers} from "../actions/customersActions";

class Dashboard extends Component {

    async componentDidMount () {
        const { dispatch } = this.props;
        await dispatch(fetchAllOrders());
        await dispatch(fetchAllProducts());
        await dispatch(fetchAllCustomers());
    }

    render () {

        const { customersCount, ordersCount, productsCount } = this.props;

        return (
            <div id="dashboard">
                <div>

                    <section className="preview-image-container"
                    style={{backgroundImage: `url(${laptop})`,
                        backgroundSize: "cover", backgroundRepeat: "no-repeat"}}
                    >
                        {/*<img src={laptop} width="100%" height="auto"/>*/}
                    </section>

                    {/*<section className="preview-image-container">*/}
                        {/*<img src={laptop} width="100%" height="auto"/>*/}
                    {/*</section>*/}

                    <div className="resources-container">

                        <div className="resource-item">
                            <Link to={"/orders"}>
                                <img src={rightArrow} className="right-arrow" alt="right arrow"/>
                                <div>
                                    <h5 className="title">Orders</h5>
                                    <p>{ordersCount}</p>
                                </div>
                            </Link>
                        </div>


                        <div className="resource-item">
                            <Link to={"/products"}>
                                <img src={rightArrow} className="right-arrow" alt="right arrow"/>
                                <div>
                                    <h5 className="title">Products</h5>
                                    <p>{productsCount}</p>
                                </div>
                            </Link>
                        </div>


                        <div className="resource-item">
                            <Link to={"/customers"}>
                                <img src={rightArrow} className="right-arrow" alt="right arrow"/>
                                <div>
                                    <h5 className="title">Customers</h5>
                                    <p>{customersCount}</p>
                                </div>
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ordersCount: state.orders.ordersCount,
        customersCount: state.customers.customersCount,
        productsCount: state.products.productsCount
    }
};

Dashboard.propTypes = {
    ordersCount: PropTypes.number.isRequired,
    customersCount: PropTypes.number.isRequired,
    productsCount: PropTypes.number.isRequired,
};


export default connect(mapStateToProps)(Dashboard);