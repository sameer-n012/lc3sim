export const incrementDebugSpeed = () => async (dispatch) => {
	try {
		dispatch({
			type: 'INCREMENT_DEBUG_SPEED_SUCCESS',
			payload: 0,
		});
	} catch (error) {
		dispatch({
			type: 'INCREMENT_DEBUG_SPEED_FAILURE',
			payload: error.message,
		});
	}
};

export const haltMachine = () => async (dispatch) => {
	try {
		dispatch({
			type: 'HALT_MACHINE_SUCCESS',
			payload: 0,
		});
	} catch (error) {
		dispatch({
			type: 'HALT_MACHINE_FAILURE',
			payload: error.message,
		});
	}
};

export const runMachine = () => async (dispatch) => {
	try {
		dispatch({
			type: 'RUN_MACHINE_SUCCESS',
			payload: 0,
		});
	} catch (error) {
		dispatch({
			type: 'RUN_MACHINE_FAILURE',
			payload: error.message,
		});
	}
};
