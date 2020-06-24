import React, { useState, useEffect } from 'react'
import { Card, CardBody } from 'reactstrap';
import './Cards.css'
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

import axios from "axios";

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

	useEffect(() => {
		let int1 = setInterval(() => {
			setTs(old => old + 1);
		}, 50)
		axios.get("/data/order")
			.then(function (res) {
				clearInterval(int1);
				setTs(res.data.count);
			})
			.catch(function (error) {
				console.log(error);
			})
	}, [])

	return (

		<div className="cards">
			<h3>Today</h3>
			<Row>
				<Layout title="Sale" count={tS} />
				<Layout title="Product" count={20} />
				<Layout title="Customer" count={30} />
			</Row>
			<h3>Total</h3>
			<Row>
				<Layout title="Sale" count={40} />
				<Layout title="Product" count={50} />
				<Layout title="Customer" count={60} />
			</Row>
		</div>

	)
}

export default Cards
