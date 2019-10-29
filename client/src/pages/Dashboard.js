import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import laptop from "../assets/laptop.jpeg";
import rightArrow from "../assets/right-arrow.svg";
import "../css/Dashboard.css";


class Dashboard extends Component {

    componentDidMount () {

    }

    render () {

        // console.log(this.props);

        const { ordersCount, customersCount, productsCount } = this.props;

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



Dashboard.propTypes = {
    ordersCount: PropTypes.number.isRequired,
    customersCount: PropTypes.number.isRequired,
    productsCount: PropTypes.number.isRequired
};


export default Dashboard;