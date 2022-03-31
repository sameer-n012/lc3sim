export const appendToOutput = (value) => async (dispatch) => {
	try {
		dispatch({
			type: 'APPEND_OUTPUT_SUCCESS',
			payload: { value: value },
		});
	} catch (error) {
		dispatch({
			type: 'APPEND_OUTPUT_FAILURE',
			payload: error.message,
		});
	}
};

export const clearOutput = () => async (dispatch) => {
	try {
		dispatch({
			type: 'CLEAR_OUTPUTS_SUCCESS',
			payload: 0,
		});
	} catch (error) {
		dispatch({
			type: 'CLEAR_OUTPUTS_FAILURE',
			payload: error.message,
		});
	}
};

export const setInput = (value) => async (dispatch) => {
	try {
		dispatch({
			type: 'SET_INPUT_SUCCESS',
			payload: { value: value },
		});
	} catch (error) {
		dispatch({
			type: 'SET_INPUT_FAILURE',
			payload: error.message,
		});
	}
};

export const clearInput = () => async (dispatch) => {
	try {
		dispatch({
			type: 'CLEAR_INPUT_SUCCESS',
			payload: 0,
		});
	} catch (error) {
		dispatch({
			type: 'CLEAR_INPUT_FAILURE',
			payload: error.message,
		});
	}
};
