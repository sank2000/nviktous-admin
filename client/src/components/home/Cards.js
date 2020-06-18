import React from 'react'
import TopCard from './home-components/TopCard'
import './Cards.css'
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

function Cards() {
    return (
        <div className="cards">
			<Row>
				<Col className="card-column" sm="4">
					<TopCard />
				</Col>
				<Col className="card-column" sm="4">
					<TopCard />
				</Col>
				<Col className="card-column" sm="4">
					<TopCard />
				</Col>
			</Row>
		</div>
    )
}

export default Cards
