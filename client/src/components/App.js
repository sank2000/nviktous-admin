import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewForm from './forms/NewForm';
import Home from "./Home";

function App() {
    return (
    	<div className="App">
			<Router>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/form" component={NewForm} />
				</Switch>
			</Router>

    	</div>
    );
}

export default App;
