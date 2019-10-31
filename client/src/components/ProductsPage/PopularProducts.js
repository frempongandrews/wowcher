import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../css/PopularProducts.css";
import { connect } from "react-redux";
import {fetchPopularProducts} from "../../actions/productsActions";

class PopularProducts extends Component {
    componentDidMount () {
        const { dispatch } = this.props;
        dispatch(fetchPopularProducts());
    }
    render () {
        const { popularProducts } = this.props;

        const popularProductItems = popularProducts.map(product => {
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
            <div id="popular-products">
                {popularProductItems}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        popularProducts: state.products.popularProducts
    }
};

PopularProducts.propTypes = {
    popularProducts: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(PopularProducts);