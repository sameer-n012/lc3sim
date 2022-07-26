import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editMemoryViewport } from '../actions/memoryActions';
import { Form } from 'react-bootstrap';
import { convertToNumber } from '../resources/numberConversions';
import { validateNumberBounds } from '../resources/validateNumberBounds';

const MemoryTableSearch = () => {
	const dispatch = useDispatch();

	const { memoryViewportError } = useSelector((state) => state.memory);
	let localMemoryViewportError = false;

	const updateLocation = (e) => {
		if (
			!validateNumberBounds(Number('0' + e.target.value)) &&
			!validateNumberBounds(Number(e.target.value)) &&
			!validateNumberBounds(
				convertToNumber(e.target.value, 'uint_binary')
			)
		) {
			localMemoryViewportError = true;
		}
		if (e.target.id === 'memlocsearch') {
			if (e.target.value.startsWith('x')) {
				dispatch(editMemoryViewport(Number('0' + e.target.value)));
			} else if (e.target.value.startsWith('0x')) {
				dispatch(editMemoryViewport(Number(e.target.value)));
			} else if (/^([01]+)$/.test(e.target.value)) {
				dispatch(
					editMemoryViewport(
						convertToNumber(e.target.value, 'uint_binary')
					)
				);
			} else if (e.target.value === '0' || e.target.value.length === 0) {
				dispatch(editMemoryViewport(0));
			} else {
				localMemoryViewportError = true;
			}
		}
	};

	return (
		<div>
			<Form.Control
				className='p-0 m-0 ps-2 memory-table-search prevent-focus-highlight'
				type='text'
				name='memloc'
				id='memlocsearch'
				placeholder='Search Memory Locations'
				style={{
					backgroundColor:
						memoryViewportError || localMemoryViewportError
							? 'lightcoral'
							: 'initial',
				}}
				onChange={(e) => updateLocation(e)}
			/>
		</div>
	);
};

export default MemoryTableSearch;
