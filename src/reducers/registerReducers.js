export const registerReducer = (
	state = { registerValues: new Array(12).fill(0) },
	action
) => {
	switch (action.type) {
		case 'EDIT_REGISTER_SUCCESS':
			state.registerValues[action.payload.registerNumber] =
				action.payload.value;
			return {
				loading: false,
				registerValues: [...state.registerValues],
			};
		case 'EDIT_REGISTER_FAILURE':
			return { ...state, loading: false, error: action.payload };
		case 'CLEAR_ALL_REGISTERS_SUCCESS':
			return { loading: false, registerValues: new Array(12).fill(0) };
		case 'CLEAR_ALL_REGISTERS_FAILURE':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};
