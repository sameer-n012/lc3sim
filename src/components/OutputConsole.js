import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

const OutputConsole = () => {
	const { outputs } = useSelector((state) => state.output);

	return (
		<Container className='pt-3'>
			<h6>Output Console</h6>
			<Container className='bg-light border border-dark rounded p-2 output-console-box'>
				{outputs.map((output, idx) => (
					<p key={idx} className='m-0'>
						{output}
					</p>
				))}
			</Container>
		</Container>
	);
};

export default OutputConsole;
