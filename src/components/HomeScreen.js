import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MemoryTable from './MemoryTable';
import StateTable from './StateTable';
import InputConsole from './InputConsole';
import OutputConsole from './OutputConsole';
import StepButtons from './StepButtons';
import ClearButtons from './ClearButtons';
import LoadButtons from './LoadButtons';

const HomeScreen = () => {
	return (
		<Container className='above-footer'>
			<Container fluid>
				<Row>
					<Col md={12} lg={8}>
						<LoadButtons />
						<ClearButtons />
						<MemoryTable />
					</Col>
					<Col md={12} lg={4}>
						<StepButtons />
						<StateTable />
						<OutputConsole />
						<InputConsole />
					</Col>
				</Row>
			</Container>
		</Container>
	);
};

export default HomeScreen;
