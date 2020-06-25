import React, { useState, useEffect } from 'react'
import { Card, CardBody } from 'reactstrap';
import './Cards.css'
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

import axios from "axios";

import Box from '@material-ui/core/Box';

function Layout(props) {

	return <Col lg="4" md="6" sm="4">
		<Card>
			<CardBody>
				<h4>{props.title}</h4>
				<h2 style={{ textAlign: "center" }}>
					{props.count}
				</h2>
			</CardBody>
		</Card>
	</Col>

}


function Cards() {
	const [tS, setTs] = useState(0);
	const [tP, setTp] = useState(0);
	const [tC, setTc] = useState(0);
	const [toS, setToS] = useState(0);
	const [toP, setToP] = useState(0);
	const [toC, setToC] = useState(0);
	const [price, setPrice] = useState(0);

	function update(url, updateState, max) {
		let inter = setInterval(() => {
			updateState(Math.floor(Math.random() * Math.floor(100)));
		}, 50)
		axios.get(url)
			.then(function (res) {
				clearInterval(inter);
				updateState(res.data.count);
			})
			.catch(function (error) {
				console.log(error);
			})

	}

	const reducer = (accumulator, currentValue) => accumulator.amount + currentValue.amount;

	useEffect(() => {
		update("/data/orderT", setTs);
		update("/data/productT", setTp);
		update("/data/userT", setTc);
		update("/data/order", setToS);
		update("/data/product", setToP);
		update("/data/user", setToC);
		let inter = setInterval(() => {
			setPrice(Math.floor(Math.random() * Math.floor(10000)));
		}, 50)
		axios.get("/order")
			.then(function (res) {
				let amt = res.data.reduce(reducer, { amount: 0 });
				clearInterval(inter);
				setPrice(amt.amount);
			})
			.catch(function (error) {
				console.log(error);
			})
	}, [])

	return (
		<>
			<div className="cards">
				<h3>Today</h3>
				<Row>
					<Layout title="Sale" count={tS} />
					<Layout title="Product" count={tP} />
					<Layout title="Customer" count={tC} />
				</Row>
				<h3>Total</h3>
				<Row>
					<Layout title="Sale" count={toS} />
					<Layout title="Product" count={toP} />
					<Layout title="Customer" count={toC} />
				</Row>
			</div>
			<Box display="flex" p={1} bgcolor="grey.300">
				<Box p={1} flexGrow={1}>
					<h4>Total Earnings </h4>
				</Box>
				<Box p={1}>
					<h4>₹ {price} </h4>
				</Box>
			</Box>
		</>

	)
}

export default Cards
