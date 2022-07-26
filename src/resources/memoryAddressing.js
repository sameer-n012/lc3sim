// TODO figure out to use getState in non-components
//import getState from 'redux-thunk';

export const getMemoryAddress = (offset, format, memory, registers) => {
	if (format === 'pc_indirect') {
		return registers[8] + offset + 1;
	}

	// TODO make base+offset and indirect memory addressing modes

	return 0;
};
