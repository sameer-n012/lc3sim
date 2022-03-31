import React from 'react';
import { Container, Button } from 'react-bootstrap';

const StepButtons = () => {
	return (
		<Container>
			<Container className='d-flex justify-content-evenly'>
				<Button variant='outline-dark' className='w-25'>
					Run
				</Button>
				<Button variant='outline-dark' className='w-25'>
					Pause
				</Button>
				<Button variant='outline-dark' className='w-25'>
					Step
				</Button>
			</Container>
		</Container>
	);
};

export default StepButtons;
