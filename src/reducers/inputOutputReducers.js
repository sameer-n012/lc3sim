export const outputReducer = (state = { outputs: [] }, action) => {
	switch (action.type) {
		case 'APPEND_OUTPUT_SUCCESS':
			return {
				loading: false,
				outputs: [...state.outputs, action.payload.value],
			};
		case 'APPEND_OUTPUT_FAILURE':
			return { ...state, loading: false, error: action.payload };
		case 'CLEAR_OUTPUTS_SUCCESS':
			return { loading: false, outputs: [] };
		case 'CLEAR_OUTPUTS_FAILURE':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const inputReducer = (state = { input: null }, action) => {
	switch (action.type) {
		case 'SET_INPUT_SUCCESS':
			return {
				loading: false,
				input: action.payload.value,
			};
		case 'SET_INPUT_FAILURE':
			return { ...state, loading: false, error: action.payload };
		case 'CLEAR_INPUT_SUCCESS':
			return { loading: false, input: null };
		case 'CLEAR_INPUT_FAILURE':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};
