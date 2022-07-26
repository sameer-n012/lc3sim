const maxDebugSpeed = 2;

export const runningReducer = (state = { running: false }, action) => {
	switch (action.type) {
		case 'RUN_MACHINE_SUCCESS':
			return {
				loading: false,
				error: null,
				running: true,
			};
		case 'RUN_MACHINE_FAILURE':
			return { ...state, loading: false, error: action.payload };
		case 'HALT_MACHINE_SUCCESS':
			return { loading: false, error: null, running: false };
		case 'HALT_MACHINE_FAILURE':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

export const debugSpeedReducer = (state = { speed: 0 }, action) => {
	switch (action.type) {
		case 'INCREMENT_DEBUG_SPEED_SUCCESS':
			return {
				loading: false,
				error: null,
				speed: (state.speed + 1) % maxDebugSpeed,
			};
		case 'INCREMENT_DEBUG_SPEED_FAILURE':
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};
