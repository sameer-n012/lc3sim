import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import { evaluate, evaluateAll } from '../computer/evalInstruction';
import { incrementDebugSpeed } from '../actions/machineStateActions';

const StepButtons = () => {
	const dispatch = useDispatch();

	const { speed } = useSelector((state) => state.debugSpeed);

	const increaseDebugSpeed = () => {
		dispatch(incrementDebugSpeed());
	};

	const step = () => {
		evaluate();
	};

	const run = () => {
		evaluateAll();
	};

	return (
		<Container>
			<Container className='d-flex justify-content-evenly'>
				<Button
					variant='outline-dark'
					className='w-25'
					onClick={() => run()}
				>
					Run
				</Button>
				<Button
					variant='outline-dark'
					className='w-25'
					onClick={() => step()}
				>
					Step
				</Button>
				<Button
					variant='outline-dark'
					className='w-25'
					onClick={() => increaseDebugSpeed()}
				>
					{`>`.repeat(speed + 1)}
				</Button>
			</Container>
		</Container>
	);
};

export default StepButtons;
