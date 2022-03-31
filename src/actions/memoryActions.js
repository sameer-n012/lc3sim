export const editMemory = (memoryLocation, value) => async (dispatch) => {
	try {
		if (
			memoryLocation < 0 ||
			memoryLocation > 0xffff ||
			(!memoryLocation && memoryLocation !== 0)
		) {
			throw Error('Memory index out of bounds');
		} else if (value < 0 || value > 0xffff || (!value && value !== 0)) {
			throw Error('Memory value out of bounds');
		}
		dispatch({
			type: 'EDIT_MEMORY_SUCCESS',
			payload: { memoryIndex: memoryLocation, value: value },
		});
	} catch (error) {
		dispatch({
			type: 'EDIT_MEMORY_FAILURE',
			payload: error.message,
		});
	}
};

export const clearMemory = () => async (dispatch) => {
	try {
		dispatch({
			type: 'CLEAR_ALL_MEMORY_SUCCESS',
			payload: 0,
		});
	} catch (error) {
		dispatch({
			type: 'CLEAR_ALL_MEMORY_FAILURE',
			payload: error.message,
		});
	}
};

export const editMemoryViewport = (start) => async (dispatch) => {
	let value = start & 0xfff0;
	try {
		if (start < 0 || start > 0xffff || (!start && start !== 0)) {
			throw Error('Memory index out of bounds');
		}
		dispatch({
			type: 'EDIT_VIEWPORT_SUCCESS',
			payload: { value: value },
		});
	} catch (error) {
		dispatch({
			type: 'EDIT_VIEWPORT_FAILURE',
			payload: error.message,
		});
	}
};
