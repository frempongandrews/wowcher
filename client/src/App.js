import React, { Component } from 'react';
import { Switch, Route, Link, NavLink } from "react-router-dom";
import closeSideBarIcon from "./assets/toggle_btn_icon.png";
import openSideBarIcon from "./assets/toggle_Collapse_btn_icon.png";
import logoutIcon from "./assets/logout_icon.png";
import logo from "./assets/wowcher-logo.png";
import { connect } from "react-redux";
import './App.css';
import Dashboard from "./components/Dashboard";
import InProgress from "./components/InProgress";

class App extends Component {

    async componentDidMount () {

    }

    render () {

        const { pathname } = this.props.location;

        return (
            <div id="App" className="container-fluid">



                {/*row*/}
                <div className="row">
                    {/*sidebar*/}
                    <aside id="sidebar" className="col-sm-3">
                        <div id="logo-section">
                            <div>

                                <img src={logo}/>
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
                    <div id="content" className="col-sm-9">

                        {/*header*/}
                        <header className="content-header">

                            <div className="sidebar-control">
                                <img src={closeSideBarIcon}/>
                            </div>

                            <div className="greeting">
                                <p>Welcome, Mike</p>
                            </div>

                            <div className="logout">
                                <img src={logoutIcon}/>
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
        state
    }
};

export default connect(mapStateToProps)(App);
