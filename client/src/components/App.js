import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewForm from './forms/NewForm';
import Home from "./home/Home";
import Product from "./main/Product";
import User from "./main/User";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/form" component={NewForm} />
					<Route path="/product" component={Product} />
					<Route path="/user" component={User} />
				</Switch>
			</Router>

		</div>
	);
}

export default App;
