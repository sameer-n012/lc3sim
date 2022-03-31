export const editRegister = (registerNumber, value) => async (dispatch) => {
	console.log('in action: ', registerNumber, value);
	try {
		if (
			registerNumber < 0 ||
			registerNumber > 11 ||
			(!registerNumber && registerNumber !== 0)
		) {
			throw Error();
		} else if (value < 0 || value > 0xffff) {
			throw Error();
		} else if (registerNumber == 11 && value > 0x0007) {
			throw Error();
		}
		dispatch({
			type: 'EDIT_REGISTER_SUCCESS',
			payload: { registerNumber: registerNumber, value: value },
		});
	} catch (error) {
		dispatch({
			type: 'EDIT_REGISTER_FAILURE',
			payload: error.message,
		});
	}
};

export const clearRegisters = () => async (dispatch) => {
	try {
		dispatch({
			type: 'CLEAR_ALL_REGISTERS_SUCCESS',
			payload: 0,
		});
	} catch (error) {
		dispatch({
			type: 'CLEAR_ALL_REGISTERS_FAILURE',
			payload: error.message,
		});
	}
};
