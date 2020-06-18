import React from 'react'
// import LineChart from './home/home-components/LineChart';
// import BarChart from './home/home-components/BarChart';
// import DoughnutChart from './home/home-components/DonutChart';
import Cards from "./home/Cards";
// import Row from 'reactstrap/lib/Row';
// import Col from 'reactstrap/lib/Col';
import TopNavbar from './home/home-components/TopNavbar';
// import {Card, CardBody, CardTitle} from 'reactstrap';

function Home() {
    return (
        <div className="Home">
            <TopNavbar />
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
    )
}

export default Home