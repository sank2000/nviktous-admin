import React from 'react'
import {Card, CardBody} from 'reactstrap';
import './Cards.css'
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';

function Cards() {
    return (
		
        <div className="cards">
			<Row>
				<Col lg="4" md="6" sm="4">
					<Card>
						<CardBody>
						<h2>Design</h2>
						<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
						minima iusto obcaecati culpa pariatur soluta exercitationem
						nemo dolorum maiores incidunt eaque natus dolore tempora,
						earum doloremque voluptatibus aliquam alias consequatur.
						</p>
						<a href="/">Read More</a>
						</CardBody>
					</Card>
				</Col>
				<Col lg="4" md="6" sm="4">
					<Card>
						<CardBody>
						<h2>Design</h2>
						<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
						minima iusto obcaecati culpa pariatur soluta exercitationem
						nemo dolorum maiores incidunt eaque natus dolore tempora,
						earum doloremque voluptatibus aliquam alias consequatur.
						</p>
						<a href="/">Read More</a>
						</CardBody>
					</Card>
				</Col>
				<Col className="col-middle" lg="4" md="6" sm="4">
					<Card>
						<CardBody>
						<h2>Design</h2>
						<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
						minima iusto obcaecati culpa pariatur soluta exercitationem
						nemo dolorum maiores incidunt eaque natus dolore tempora,
						earum doloremque voluptatibus aliquam alias consequatur.
						</p>
						<a href="/">Read More</a>
						</CardBody>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col lg="4" md="6" sm="4">
					<Card>
						<CardBody>
						<h2>Design</h2>
						<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
						minima iusto obcaecati culpa pariatur soluta exercitationem
						nemo dolorum maiores incidunt eaque natus dolore tempora,
						earum doloremque voluptatibus aliquam alias consequatur.
						</p>
						<a href="/">Read More</a>
						</CardBody>
					</Card>
				</Col>
				<Col lg="4" md="6" sm="4">
					<Card>
						<CardBody>
						<h2>Design</h2>
						<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
						minima iusto obcaecati culpa pariatur soluta exercitationem
						nemo dolorum maiores incidunt eaque natus dolore tempora,
						earum doloremque voluptatibus aliquam alias consequatur.
						</p>
						<a href="/">Read More</a>
						</CardBody>
					</Card>
				</Col>
				<Col className="col-middle" lg="4" md="6" sm="4">
					<Card>
						<CardBody>
						<h2>Design</h2>
						<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
						minima iusto obcaecati culpa pariatur soluta exercitationem
						nemo dolorum maiores incidunt eaque natus dolore tempora,
						earum doloremque voluptatibus aliquam alias consequatur.
						</p>
						<a href="/">Read More</a>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
		
    )
}

export default Cards
