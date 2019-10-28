import React, { Component } from 'react';
import { Switch, Route, Link, NavLink } from "react-router-dom";
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
                            logo
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
                        <header className="content-header">
                            header
                        </header>

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
