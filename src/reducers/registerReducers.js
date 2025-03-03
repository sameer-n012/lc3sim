import { formatNZP } from "../resources/formatting";

export const registerReducer = (
    state = {
        registerValues: new Array(8).fill(0).concat([0x3000, 0, 0x8002, 0x2]),
    },
    action,
) => {
    switch (action.type) {
        case "EDIT_REGISTER_SUCCESS":
            if (action.payload.registerNumber === 10) {
                state.registerValues[11] = action.payload.value & 0x7;
            }
            state.registerValues[action.payload.registerNumber] =
                action.payload.value;
            return {
                loading: false,
                registerValues: [...state.registerValues],
            };
        case "EDIT_REGISTER_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "CLEAR_ALL_REGISTERS_SUCCESS":
            return { loading: false, registerValues: new Array(12).fill(0) };
        case "CLEAR_ALL_REGISTERS_FAILURE":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
