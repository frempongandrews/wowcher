import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import closeSideBarIcon from "./assets/toggle_btn_icon.png";
// import openSideBarIcon from "./assets/toggle_Collapse_btn_icon.png";
import logoutIcon from "./assets/logout_icon.png";
import logo from "./assets/wowcher-logo.png";
import { connect } from "react-redux";
import './App.css';
import Dashboard from "./pages/Dashboard";
import InProgress from "./pages/InProgress";
import {closeSidebar, openSidebar} from "./actions/appActions";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import CustomersPage from "./pages/CustomersPage";
import {fetchAllOrders, searchOrderById, sortOrders} from "./actions/ordersActions";
import {fetchAllProducts} from "./actions/productsActions";
import {fetchAllCustomers} from "./actions/customersActions";

class App extends Component {

    async componentDidMount () {
        const { dispatch } = this.props;
        await dispatch(fetchAllOrders());
        await dispatch(fetchAllProducts());
        await dispatch(fetchAllCustomers());
    }

    onCloseSidebar = () => {
        const { dispatch } = this.props;
        dispatch(closeSidebar());
    };

    onOpenSidebar = () => {
        const { dispatch } = this.props;
        dispatch(openSidebar());
    };

    onSortOrders = () => {
        const { dispatch } = this.props;
        dispatch(sortOrders());
    };

    onSearchOrderById = (orderId) => {
        const { dispatch } = this.props;
        dispatch(searchOrderById(orderId));
    };

    render () {

        const { isSidebarOpened, ordersCount, productsCount, customersCount, orders, products, customers, ordersSortOrder, searchedOrders } = this.props;
        const { pathname } = this.props.location;

        let resourcesCountObj = {
            ordersCount,
            customersCount,
            productsCount
        };

        let ordersPageProps = {
            orders,
            searchedOrders,
            ordersSortOrder,
            onSortOrders: this.onSortOrders,
            onSearchOrderById: this.onSearchOrderById
        };

        let productsPageProps = {
            products,
        };

        return (
            <div id="App" className="container-fluid">



                {/*row*/}
                <div className="row">
                    {/*sidebar*/}
                    <aside id="sidebar" className="col-sm-3" style={{maxWidth: isSidebarOpened ? "25%" : "0%", transform: isSidebarOpened ? "translateX(0px)" : "translateX(-200px)"}}>
                        <div id="logo-section">
                            <div>
                                <img src={logo} alt="wowcher logo"/>
                                <span className="cher">cher</span>
                            </div>
                        </div>


                        <p className="main-section-title">Main</p>
                        <nav>
                            <ul>
                                <Link to={"/"}><li className={`${pathname ==="/" ? "active-section" : ""}`}>Dashboard</li></Link>
                                <Link to={"/profile"}><li className={`${pathname ==="/profile" ? "active-section" : ""}`}>Profile</li></Link>
                                <Link to={"/manage-users"}><li className={`${pathname ==="/manage-users" ? "active-section" : ""}`}>Manage Users</li></Link>
                            </ul>
                        </nav>


                        <div className="divider"/>

                        <p className="resources-section-title">Resources</p>

                        <nav>
                            <ul>
                                <Link to={"/orders"}><li className={`${pathname ==="/orders" ? "active-section" : ""}`}>Orders</li></Link>
                                <Link to={"/products"}><li className={`${pathname ==="/products" ? "active-section" : ""}`}>Products</li></Link>
                                <Link to={"/customers"}><li className={`${pathname ==="/customers" ? "active-section" : ""}`}>Customers</li></Link>
                            </ul>
                        </nav>


                    </aside>
                    {/* /sidebar*/}

                    {/*content*/}
                    <div id="content" className="col-sm-9" style={{maxWidth: isSidebarOpened ? "75%" : "100%"}}>

                        {/*header*/}
                        <header className="content-header">

                            <div className="sidebar-control"
                                 onClick={isSidebarOpened ? this.onCloseSidebar : this.onOpenSidebar}
                                 title={isSidebarOpened ? "Hide sidebar" : "Show sidebar"}>

                                <img src={closeSideBarIcon} alt="close sidebar icon" style={{transform: isSidebarOpened ? "rotate(0deg)" : "rotate(180deg)"}}/>

                            </div>

                            <div className="greeting">
                                <p>Welcome, Andrews</p>
                            </div>

                            <div className="logout" title="Logout">
                                <img src={logoutIcon} alt="logout icon"/>
                            </div>

                        </header>
                        {/* /header*/}

                        <Switch>
                            {/*main section*/}
                            <Route path={"/"} exact={true} render={(props) => <Dashboard {...props} {...resourcesCountObj}/>}/>
                            <Route path={"/profile"} exact={true} render={(props) => <InProgress {...props}/>}/>
                            <Route path={"/manage-users"} exact={true} component={InProgress}/>
                            {/* /main section*/}

                            {/*resources section*/}
                            <Route path={"/orders"} render={(props) => <OrdersPage {...props} {...ordersPageProps}/>}/>
                            <Route path={"/products"} render={(props) => <ProductsPage {...props} {...productsPageProps}/>}/>
                            <Route path={"/customers"} render={(props) => <CustomersPage {...props}/>}/>
                            {/* /resources section*/}
                        </Switch>


                    </div>
                    {/* /content*/}

                </div>
                {/* /row*/}

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isSidebarOpened: state.app.isSidebarOpened,
        orders: state.orders.orders,
        ordersCount: state.orders.ordersCount,
        customers: state.customers.customers,
        customersCount: state.customers.customersCount,
        products: state.products.products,
        productsCount: state.products.productsCount,
        ordersSortOrder: state.orders.ordersSortOrder,
        searchedOrders: state.orders.searchedOrders
    }
};

App.propTypes = {
    isSidebarOpened: PropTypes.bool.isRequired,
    orders: PropTypes.array.isRequired,
    searchedOrders: PropTypes.array.isRequired,
    ordersCount: PropTypes.number.isRequired,
    customers: PropTypes.array.isRequired,
    customersCount: PropTypes.number.isRequired,
    products: PropTypes.array.isRequired,
    productsCount: PropTypes.number.isRequired,
    ordersSortOrder: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(App);
