import React from 'react';
import { useDispatch } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import { clearMemory } from '../actions/memoryActions';
import { clearRegisters } from '../actions/registerActions';
import { clearOutput } from '../actions/inputOutputActions';

const ClearButtons = () => {
	const dispatch = useDispatch();

	return (
		<Container className='pt-3'>
			<Container className='d-flex justify-content-evenly'>
				<Button
					variant='outline-dark'
					className='w-25'
					onClick={() => dispatch(clearMemory())}
				>
					Reset Mem
				</Button>
				<Button
					variant='outline-dark'
					className='w-25'
					onClick={() => dispatch(clearRegisters())}
				>
					Reset Regs
				</Button>
				<Button
					variant='outline-dark'
					className='w-25'
					onClick={() => dispatch(clearOutput())}
				>
					Clear Out
				</Button>
			</Container>
		</Container>
	);
};

export default ClearButtons;
