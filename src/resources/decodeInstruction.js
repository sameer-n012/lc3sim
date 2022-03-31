export const describeInstruction = (instr) => {
	if (instr < 0x0000 || instr > 0xffff) {
		return 'Invalid Instruction';
	}

	if (instr === 0x0000) {
		// NOP
		// 0000 0000 0000 0000
		return 'NOP';
	} else if (instr >>> 12 === 0x0009 && (instr & 0x003f) === 0x003f) {
		// NOT  DST SRC
		// 1001 xxx xxx 1 11111
		let label = 'NOT';
		let dst = (instr >>> 9) & 0x0007;
		let src = (instr >>> 6) & 0x0007;
		return `R${dst} <- NOT(R${src})`;
	} else {
		return 'Invalid Instruction';
	}
};
