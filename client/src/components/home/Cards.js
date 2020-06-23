import React from 'react'
import { Card, CardBody } from 'reactstrap';
import './Cards.css'
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

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

const today = [
	{
		title: "Sale",
		count: 10
	},
	{
		title: "Product",
		count: 20
	},
	{
		title: "Customer",
		count: 15
	}
]

const total = [
	{
		title: "Sale",
		count: 40
	},
	{
		title: "Product",
		count: 50
	},
	{
		title: "Customer",
		count: 30
	}
]

function Cards() {
	return (

		<div className="cards">
			<h3>Today</h3>
			<Row>
				{today.map((val, ind) => <Layout key={ind} title={val.title} count={val.count} />)}
			</Row>
			<h3>Total</h3>
			<Row>
				{total.map((val, ind) => <Layout key={ind} title={val.title} count={val.count} />)}
			</Row>
		</div>

	)
}

export default Cards
