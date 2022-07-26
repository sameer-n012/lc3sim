import React from 'react';
import { Container, Form } from 'react-bootstrap';

const InputConsole = () => {
	return (
		<Container className='pt-3'>
			<h6>Input Console</h6>
			<Form.Control
				as='textarea'
				rows='5'
				name='input-console'
				className='bg-light border border-dark rounded p-2 input-console-box'
				onChange={(e) => console.log('input changing')}
			/>
		</Container>
	);
};

export default InputConsole;
