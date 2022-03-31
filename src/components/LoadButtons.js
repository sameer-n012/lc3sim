import React from 'react';
import { Container, Button } from 'react-bootstrap';

const LoadButtons = () => {
	return (
		<Container>
			<Container className='d-flex justify-content-evenly'>
				<Button disabled variant='outline-dark' className='w-25'>
					Help
				</Button>
				<Button disabled variant='outline-dark' className='w-25'>
					Load Program
				</Button>
				<Button disabled variant='outline-dark' className='w-25'>
					Load Memory
				</Button>
			</Container>
		</Container>
	);
};

export default LoadButtons;
