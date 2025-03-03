export const memoryReducer = (
    state = { startLoc: 0, memoryValues: new Array(0x10000).fill(0) },
    action,
) => {
    switch (action.type) {
        case "EDIT_MEMORY_SUCCESS":
            state.memoryValues[action.payload.memoryIndex] =
                action.payload.value;
            return {
                ...state,
                loading: false,
                memoryValues: [...state.memoryValues],
            };
        case "EDIT_MEMORY_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "SET_MEMORY_SUCCESS":
            return {
                ...state,
                loading: false,
                memoryValues: action.payload,
            };
        case "SET_MEMORY_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "CLEAR_ALL_MEMORY_SUCCESS":
            return {
                ...state,
                loading: false,
                memoryValues: new Array(0x10000).fill(0),
            };
        case "CLEAR_ALL_MEMORY_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "EDIT_VIEWPORT_SUCCESS":
            return {
                ...state,
                loading: false,
                memoryViewportError: null,
                startLoc: action.payload.value,
            };
        case "EDIT_VIEWPORT_FAILURE":
            return {
                ...state,
                loading: false,
                memoryViewportError: action.payload,
            };
        default:
            return state;
    }
};
