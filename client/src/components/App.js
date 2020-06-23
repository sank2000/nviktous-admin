import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewForm from './forms/NewForm';
import Home from "./home/Home";
import Product from "./main/Product";
import User from "./main/User";
import Login from "./login/Login"

import Order from "./order/main";

import TopNavBar from "./home/home-components/TopNavbar";

import ProductView from "./main/ProductView";

function App() {
	return (
		<div className="App">
			<Router>
				<TopNavBar />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/form" exact component={NewForm} />
					<Route path="/login" exact component={Login} />
					<Route path="/product" exact component={Product} />
					<Route path="/product/:itemId" exact component={ProductView} />
					<Route path="/order/:id" exact component={Order} />
					<Route path="/user" exact component={User} />
				</Switch>
			</Router>

		</div>
	);
}

export default App;
