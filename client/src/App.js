import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import closeSideBarIcon from "./assets/toggle_btn_icon.png";
import openSideBarIcon from "./assets/toggle_Collapse_btn_icon.png";
import logoutIcon from "./assets/logout_icon.png";
import logo from "./assets/wowcher-logo.png";
import { connect } from "react-redux";
import './App.css';
import Dashboard from "./components/Dashboard";
import InProgress from "./components/InProgress";
import {closeSidebar, openSidebar} from "./actions/appActions";

class App extends Component {

    async componentDidMount () {

    }

    onCloseSidebar = () => {
        const { dispatch } = this.props;
        dispatch(closeSidebar());
    };

    onOpenSidebar = () => {
        const { dispatch } = this.props;
        dispatch(openSidebar());
    };

    render () {

        const { isSidebarOpened } = this.props;
        const { pathname } = this.props.location;

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

                        <nav>
                            <ul>
                                <Link to={"/"}><li className={`${pathname ==="/" ? "active-section" : ""}`}>Dashboard</li></Link>
                                <Link to={"/profile"}><li className={`${pathname ==="/profile" ? "active-section" : ""}`}>Profile</li></Link>
                                <Link to={"/manage-users"}><li className={`${pathname ==="/manage-users" ? "active-section" : ""}`}>Manage Users</li></Link>
                            </ul>
                        </nav>

                    </aside>
                    {/* /sidebar*/}

                    {/*content*/}
                    <div id="content" className="col-sm-9" style={{maxWidth: isSidebarOpened ? "75%" : "100%"}}>

                        {/*header*/}
                        <header className="content-header">

                            <div className="sidebar-control" onClick={isSidebarOpened ? this.onCloseSidebar : this.onOpenSidebar}>

                                <img src={closeSideBarIcon} alt="close sidebar icon" style={{transform: isSidebarOpened ? "rotate(0deg)" : "rotate(180deg)"}}/>

                            </div>

                            <div className="greeting">
                                <p>Welcome, Mike</p>
                            </div>

                            <div className="logout">
                                <img src={logoutIcon} alt="logout icon"/>
                            </div>

                        </header>
                        {/* /header*/}

                        <Switch>
                            <Route path={"/"} exact={true} render={(props) => <Dashboard {...props}/>}/>
                            <Route path={"/profile"} exact={true} render={(props) => <InProgress {...props}/>}/>
                            <Route path={"/manage-users"} exact={true} component={InProgress}/>
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
        isSidebarOpened: state.app.isSidebarOpened
    }
};

App.propTypes = {
    isSidebarOpened: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(App);
