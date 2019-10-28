import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers/index";
import { BrowserRouter as Router, Route } from "react-router-dom";

const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();

const store = createStore(reducers, {}, devToolsExtension(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route render={(props) => <App {...props}/>}/>
        </Router>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
