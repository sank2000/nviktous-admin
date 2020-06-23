import React from 'react'
// import LineChart from './home/home-components/LineChart';
// import BarChart from './home/home-components/BarChart';
// import DoughnutChart from './home/home-components/DonutChart';
import Cards from "./Cards";
// import Row from 'reactstrap/lib/Row';
// import Col from 'reactstrap/lib/Col';
// import {Card, CardBody, CardTitle} from 'reactstrap';

import NavBar from "../nav/TopNavbar";

function Home() {
	return (
		<>
			<NavBar />
			<div className="Home">
				<Cards />
				{/* <div className="linechart">
				<Row>
					<Col md="6" className="column">
						<Card>
							<CardBody>
							<CardTitle>Line Graph</CardTitle>
							<LineChart />
							</CardBody>
						</Card>
					</Col>
					<Col md="6" className="column">
						<Card>
							<CardBody>
							<CardTitle>Line Graph</CardTitle>
							<LineChart />
							</CardBody>
						</Card>
						
					</Col>
				</Row>
			</div>
        	<div className="chart">
				<Row>
					<Col md="6" className="column">
						<Card>
							<CardBody>
							<CardTitle>Bar Graph</CardTitle>
							<BarChart />
							</CardBody>
						</Card>
					</Col>
					<Col md="6" className="column">
						<Card>
							<CardBody>
							<CardTitle>Doughnut Graph</CardTitle>
							<DoughnutChart />
							</CardBody>
						</Card>
					</Col>
				</Row>
        	</div> */}
			</div>
		</>
	)
}

export default Home