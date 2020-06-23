import React, { useState, Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NewForm from './forms/NewForm';
import Home from "./home/Home";
import Product from "./main/Product";
import User from "./main/User";

import Order from "./order/main";

import TopNavBar from "./home/home-components/TopNavbar";

import ProductView from "./main/ProductView";

import AuthApi from "./auth/AuthApi";

import axios from "axios";

import Login from "./login/Login";

import FlexContainer from "./containers/FlexContainer";
import RingLoader from "react-spinners/RingLoader";


function Loading() {
	return (
		<FlexContainer>
			<img
				src="./images/logo.png"
				alt=""
				style={{
					width: "50px",
					height: "50px",
					position: "relative",
					top: "80px",
					left: "7px"
				}}
			/>
			<RingLoader size={100} color={"#C71585"} loading={true} />
		</FlexContainer>
	);
}



function App() {
	const [auth, setAuth] = useState(false);
	const [load, setLoad] = useState(true);

	useEffect(() => {
		axios.get("/auth")
			.then(function (res) {
				if (res.data.auth) {
					setAuth(res.data);
				}
				setLoad(false);
			})
			.catch(function (error) {
				console.log(error);
			})
	}, []);



	return (
		<Fragment>
			{load ? <Loading /> : <div className="App">
				<AuthApi.Provider value={{ auth, setAuth }}>
					<Router>
						<TopNavBar />
						<Switch>
							<RouteRegistration path="/sign" exact component={Login} />
							<RouteProtected path="/" exact component={Home} />
							<RouteProtected path="/form" exact component={NewForm} />
							<RouteProtected path="/product" exact component={Product} />
							<RouteProtected path="/product/:itemId" exact component={ProductView} />
							<RouteProtected path="/order/:id" exact component={Order} />
							<RouteProtected path="/user" exact component={User} />
						</Switch>
					</Router>
				</AuthApi.Provider>
			</div>
			}
		</Fragment>
	);
}


const RouteRegistration = ({ component: Component, ...rest }) => {
	const AthApi = React.useContext(AuthApi);
	return (
		<Route
			{...rest}
			render={(props) =>
				!AthApi.auth.auth ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
}



const RouteProtected = ({ component: Component, ...rest }) => {
	const AthApi = React.useContext(AuthApi);
	return (
		<Route
			{...rest}
			render={(props) =>
				AthApi.auth.auth ? <Component {...props} /> : <Redirect to="/sign" />
			}
		/>
	);
}


export default App;
