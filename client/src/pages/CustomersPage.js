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


                <div id="orders-table">

                    <div className="nav">
                        {/*<li onClick={null} className={`${listToShow === LIST_TO_SHOW.allProducts ? "active-list" : ""}`}>All Products <span className="count">{productsCount}</span></li>*/}
                        {/*<li onClick={null} className={`${listToShow === LIST_TO_SHOW.popular ? "active-list" : ""}`}>Popular</li>*/}
                        <li onClick={null} className={`active-list`}>All Customers <span className="count">2</span></li>

                    </div>

                    {/*Table fields*/}

                    {/*All Products fields*/}
                    {/*{*/}
                        {/*listToShow === LIST_TO_SHOW.allProducts &&*/}
                        {/*<div className="fields">*/}
                            {/*<li>*/}
                                {/*<span>ProductId*/}

                                    {/*{*/}
                                        {/*allProductsSortOrder === "ASC" &&*/}
                                        {/*<i className="fa fa-caret-up" aria-hidden="true"*/}
                                           {/*title="Sort By Id"*/}
                                           {/*onClick={this.onSortAllProductsById}/>*/}
                                    {/*}*/}

                                    {/*{*/}
                                        {/*allProductsSortOrder === "DSC" &&*/}
                                        {/*<i className="fa fa-caret-down" aria-hidden="true"*/}
                                           {/*title="Sort By Id"*/}
                                           {/*onClick={this.onSortAllProductsById}/>*/}
                                    {/*}*/}

                                {/*</span>*/}
                            {/*</li>*/}
                            {/*<li>ProductName</li>*/}
                            {/*<li>N. times ordered</li>*/}
                            {/*<li>Ordered by</li>*/}
                        {/*</div>*/}
                    {/*}*/}


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

                    {/*Popular Products fields*/}
                    {/*{*/}
                        {/*listToShow === LIST_TO_SHOW.popular &&*/}
                        {/*<div className="fields popular-fields">*/}
                            {/*<li>*/}
                                {/*<span>ProductId</span>*/}
                            {/*</li>*/}
                            {/*<li>ProductName</li>*/}
                            {/*<li id="number-of-times-title">*/}
                                {/*<span>N. times ordered*/}
                                    {/*{*/}

                                        {/*popularProductsSortOrder === "DSC" &&*/}
                                        {/*<i className="fa fa-caret-down" aria-hidden="true"*/}
                                           {/*title="Sort by N. times ordered"*/}
                                           {/*onClick={this.onSortPopularProductsByOrderCount}/>*/}
                                    {/*}*/}

                                    {/*{*/}

                                        {/*popularProductsSortOrder === "ASC" &&*/}
                                        {/*<i className="fa fa-caret-up" aria-hidden="true"*/}
                                           {/*title="Sort by N. times ordered"*/}
                                           {/*onClick={this.onSortPopularProductsByOrderCount}/>*/}
                                    {/*}*/}
                                {/*</span>*/}
                            {/*</li>*/}
                            {/*<li>Ordered by</li>*/}
                        {/*</div>*/}
                    {/*}*/}
                    {/* /Popular Products fields*/}

                    {/* /Table fields*/}


                    {/*content*/}
                    <div>

                        {/*All Products content*/}
                        {/*{*/}
                            {/*listToShow === LIST_TO_SHOW.allProducts&&*/}
                            {/*<div>*/}
                                {/*{*/}
                                    {/*this.state.searchText.trim() === "" &&*/}
                                    {/*productItems*/}
                                {/*}*/}

                                {/*{*/}
                                    {/*typeof (this.state.searchText.trim() === "string") &&*/}
                                    {/*searchedProductsItems*/}
                                {/*}*/}

                            {/*</div>*/}

                        {/*}*/}
                        {/* /All Products content*/}

                        {/*All Popular content*/}
                        {/*{*/}
                            {/*listToShow === LIST_TO_SHOW.popular &&*/}
                            {/*<PopularProducts/>*/}
                        {/*}*/}

                        {/* /All Popular content*/}



                        <div>
                            {/*{*/}
                                {/*this.state.searchText.trim() === "" &&*/}
                                {/*productItems*/}
                            {/*}*/}

                            {/*{*/}
                                {/*typeof (this.state.searchText.trim() === "string") &&*/}
                                {/*searchedProductsItems*/}
                            {/*}*/}



                        </div>

                    </div>
                    {/* /content*/}


                </div>
            </div>
        )

    }
}

export default CustomersPage;