import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Form, Table, Modal, Button } from 'react-bootstrap';
import { convertToString } from '../resources/numberConversions';
import MemoryTableSearch from './MemoryTableSearch';
import { describeInstruction } from '../resources/decodeInstruction';
import { validateNumberBounds } from '../resources/validateNumberBounds';
import { editMemory } from '../actions/memoryActions';

const MemoryTable = () => {
	const dispatch = useDispatch();

	const [modal, setModal] = useState({
		show: false,
		memloc: 0,
		editedValue: 0,
		editMemoryValueError: false,
	});

	const handleClose = () =>
		setModal({ show: false, memloc: 0, editedValue: 0 });
	const handleShow = (memloc, editedValue) =>
		setModal({ show: true, memloc: memloc, editedValue: editedValue });

	const { startLoc, memoryValues } = useSelector((state) => state.memory);
	const { registerValues } = useSelector((state) => state.registers);
	const pc = registerValues[8];

	const showEditMemory = (location) => {
		handleShow(location, memoryValues[location]);
		//console.log('editing memory at', convertToString(location, 'hex', 4));
	};

	const dispatchEditMemory = (location, value) => {
		//console.log('dispatch edit memory', location, value);
		if (!validateNumberBounds(location) || !validateNumberBounds(value)) {
			dispatch(editMemory(-1, -1));
			return;
		}
		dispatch(editMemory(Number(location), Number(value)));
		handleClose();
	};

	return (
		<Container className='pt-3'>
			<Modal show={modal.show} onHide={handleClose} backdrop='static'>
				<Modal.Header closeButton>
					<Modal.Title>
						Editing{' '}
						{convertToString(
							modal.memloc ? modal.memloc : 0,
							'hex',
							4
						)}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Control
						className='p-2 m-0 ps-2'
						type='text'
						name='editmemory'
						id='memlocsearch'
						placeholder='Enter Value'
						defaultValue={convertToString(
							modal.editedValue,
							'hex',
							4
						)}
						style={{
							backgroundColor: modal.editMemoryValueError //FIXME background color not changing on save
								? 'lightcoral'
								: 'initial',
						}}
						onChange={(e) =>
							setModal({ ...modal, editedValue: e.target.value })
						}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Cancel
					</Button>
					<Button
						variant='primary'
						onClick={() =>
							dispatchEditMemory(modal.memloc, modal.editedValue)
						}
					>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
			<Table striped bordered hover className=''>
				<thead>
					<tr>
						<th colSpan={1}>Memory</th>
						<th colSpan={2}>
							<MemoryTableSearch />
						</th>
					</tr>
				</thead>

				<thead>
					<tr>
						<th>Memory Location</th>
						<th>Instruction</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					{[...Array(16)].map((x, i) => (
						<tr
							key={convertToString(startLoc + i, 'hex', 4)}
							style={{
								backgroundColor:
									pc === startLoc + i ? 'lightblue' : '',
							}}
						>
							<td>{convertToString(startLoc + i, 'hex', 4)}</td>
							<td>
								<code
									className='cursor-clickable'
									onClick={() => showEditMemory(startLoc + i)}
								>
									{convertToString(
										memoryValues[startLoc + i],
										'hex',
										4
									)}
								</code>
							</td>
							<td>
								{describeInstruction(
									memoryValues[startLoc + i],
									memoryValues,
									registerValues
								)}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default MemoryTable;
