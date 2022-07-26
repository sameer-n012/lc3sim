export const opCodeToString = (instr) => {
	if (instr === 0) {
		return 'NOP';
	}

	let opCode = (instr & 0xf000) >> 12;
	// console.log(instr);
	// console.log(opCode, 0x9);

	// NOTE BR
	if (opCode === 0x0) {
		if ((instr & 0x0e00) === 0) {
			return 'NOP';
		} else if ((instr & 0x01ff) === 0) {
			return 'NOP';
		} else {
			return 'BR';
		}
	}

	// NOTE ADD
	if (opCode === 0x1) {
		if ((instr & 0x0038) === 0x0000) {
			return 'ADD_R';
		} else if ((instr & 0x0020) === 0x0020) {
			return 'ADD_I';
		} else {
			return 'INVALID';
		}
	}

	// NOTE LD
	if (opCode === 0x2) {
		return 'LD';
	}

	// NOTE ST
	if (opCode === 0x3) {
		return 'ST';
	}

	// NOTE JSR
	if (opCode === 0x4) {
		if ((instr & 0x0800) === 0x0800) {
			return 'JSR_P';
		} else if ((instr & 0x0e3f) === 0x0000) {
			return 'JSR_B';
		} else {
			return 'INVALID';
		}
	}

	// NOTE AND
	if (opCode === 0x5) {
		if ((instr & 0x0038) === 0x0000) {
			return 'AND_R';
		} else if ((instr & 0x0020) === 0x0020) {
			return 'AND_I';
		} else {
			return 'INVALID';
		}
	}

	// NOTE LDR
	if (opCode === 0x6) {
		return 'LDR';
	}

	// NOTE STR
	if (opCode === 0x7) {
		return 'STR';
	}

	// NOTE RTI
	if (opCode === 0x8) {
		if ((instr & 0x0fff) === 0x0000) {
			return 'RTI';
		} else {
			return 'INVALID';
		}
	}

	// NOTE NOT
	if (opCode === 0x9) {
		if ((instr & 0x003f) === 0x003f) {
			return 'NOT';
		} else {
			return 'INVALID';
		}
	}

	// NOTE LDI
	if (opCode === 0xa) {
		return 'LDI';
	}

	// NOTE STI
	if (opCode === 0xb) {
		return 'STI';
	}

	// NOTE JMP/RET
	if (opCode === 0xc) {
		// NOTE does not need to include RET, RET = JMP(R7)
		// if ((instr & 0x0fff) === 0x01c0) {
		// 	return 'RET';
		// } else if ((instr & 0x0e00) === 0x0000) {
		// 	return 'JMP';
		// } else {
		// 	return 'INVALID';
		// }
		if ((instr & 0x0e00) === 0x0000) {
			return 'JMP';
		} else {
			return 'INVALID';
		}
	}

	// NOTE reserved
	// TODO implement reserved opcode
	if (opCode === 0xd) {
		return 'INVALID';
	}

	// NOTE LEA
	if (opCode === 0xe) {
		return 'LEA';
	}

	// NOTE TRAP
	if (opCode === 0xf) {
		if ((instr & 0x0fff) === 0x0020) {
			return 'TRAP_G';
		} else if ((instr & 0x0fff) === 0x0021) {
			return 'TRAP_O';
		} else if ((instr & 0x0fff) === 0x0022) {
			return 'TRAP_P';
		} else if ((instr & 0x0fff) === 0x0023) {
			return 'TRAP_I';
		} else if ((instr & 0x0fff) === 0x0025) {
			return 'TRAP_H';
		} else if ((instr & 0x0f00) === 0x0000) {
			return 'TRAP';
		} else {
			return 'INVALID';
		}
	}

	return 'INVALID';
};
