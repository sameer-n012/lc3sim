import store from '../store';
import { appendToOutput, clearOutput } from '../actions/inputOutputActions';
import { opCodeToString } from './opcodeDict';
import { sext } from '../resources/numberConversions';
import { editRegister } from '../actions/registerActions';
import { editMemory } from '../actions/memoryActions';

// TODO implement evaluate
export const evaluate = () => {
	const state = store.getState(); // <-- get store as such
	const registers = state.registers.registerValues;
	const pc = registers[8] + 1;
	const instr = getMemoryValue(pc - 1);

	if (instr < 0x0000 || instr > 0xffff) {
		haltFromInvalid();
	}

	const opCode = opCodeToString(instr);

	// NOTE INVALID
	if (opCode === 'INVALID') {
		haltFromInvalid();
		return;
	}

	// NOTE NOP
	if (opCode === 'NOP') {
		// NOP
		// 0000 0000 0000 0000
		return;
	}

	// NOTE BR
	if (opCode === 'BR') {
		// BR   NZP PCOFFSET
		// 0000 xxx xxxxxxxxx
		let n = (instr & 0x0800) >> 11;
		let z = (instr & 0x0400) >> 10;
		let p = (instr & 0x0200) >> 9;
		let offset = sext((instr & 0x01ff) >> 0);
		if (registers[11] === 4 && n === 1) {
			store.dispatch(editRegister(8, pc + offset));
		} else if (registers[11] === 2 && z === 1) {
			store.dispatch(editRegister(8, pc + offset));
		} else if (registers[11] === 1 && p === 1) {
			store.dispatch(editRegister(8, pc + offset));
		}
		return;
	}

	// NOTE ADD_R
	if (opCode === 'ADD_R') {
		// ADD  DST SRC     SRC
		// 0001 xxx xxx 000 xxx
		let dst = (instr & 0x0e00) >> 9;
		let src1 = (instr & 0x01c0) >> 6;
		let src2 = (instr & 0x0007) >> 0;
		store.dispatch(editRegister(dst, registers[src1] + registers[src2]));
		return;
	}

	// NOTE ADD_I
	if (opCode === 'ADD_I') {
		// ADD  DST SRC   IMM
		// 0001 xxx xxx 1 xxxxx
		let dst = (instr & 0x0e00) >> 9;
		let src1 = (instr & 0x01c0) >> 6;
		let imm = (instr & 0x001f) >> 0;
		store.dispatch(editRegister(dst, registers[src1] + imm));
		return;
	}

	// NOTE LD
	if (opCode === 'LD') {
		// LD   DST PCOFFSET
		// 0010 xxx xxxxxxxxx
		let dst = (instr & 0x0e00) >> 9;
		let offset = sext((instr & 0x01ff) >> 0);
		store.dispatch(editRegister(dst, getMemoryValue(pc + offset)));
		return;
	}

	// NOTE ST
	if (opCode === 'ST') {
		// ST   SRC PCOFFSET
		// 0011 xxx xxxxxxxxx
		let src = (instr & 0x0e00) >> 9;
		let offset = sext((instr & 0x01ff) >> 0);
		store.dispatch(editMemory(pc + offset, src));
		return;
	}

	// NOTE JSR_P
	if (opCode === 'JSR_P') {
		// JSR    PCOFFSET
		// 0100 1 xxxxxxxxxxx
		let offset = sext((instr & 0x07ff) >> 0);
		store.dispatch(editRegister(7, pc));
		store.dispatch(editRegister(8, pc + offset));
		return;
	}

	// NOTE JSR_B
	if (opCode === 'JSR_B') {
		// JSR       BSE
		// 0100 0 00 xxx 000000
		let bse = (instr & 0x01c0) >> 6;
		store.dispatch(editRegister(7, pc));
		store.dispatch(editRegister(8, registers[bse]));
		return;
	}

	// NOTE AND_R
	if (opCode === 'AND_R') {
		// AND  DST SRC      SRC
		// 0101 xxx xxx 0 00 xxx
		let dst = (instr & 0x0e00) >> 9;
		let src1 = (instr & 0x01c0) >> 6;
		let src2 = (instr & 0x0007) >> 0;
		store.dispatch(
			editRegister(dst, Number(registers[src1] & registers[src2]))
		);
		return;
	}

	// NOTE AND_I
	if (opCode === 'AND_I') {
		// AND  DST SRC   IMM
		// 0101 xxx xxx 1 xxxxx
		let dst = (instr & 0x0e00) >> 9;
		let src1 = (instr & 0x01c0) >> 6;
		let imm = (instr & 0x0001f) >> 0; // QUESTION should this be sign extended
		store.dispatch(editRegister(dst, Number(registers[src1] & imm)));
		return;
	}

	// NOTE LDR
	if (opCode === 'LDR') {
		// LDR  DST BSE OFFSET
		// 0110 xxx xxx xxxxxx
		let dst = (instr & 0x0e00) >> 9;
		let bse = (instr & 0x01c0) >> 6;
		let offset = sext((instr & 0x003f) >> 0);
		store.dispatch(
			editRegister(dst, getMemoryValue(Number(registers[bse] + offset)))
		);
		return;
	}

	// NOTE STR
	if (opCode === 'STR') {
		// STR  SRC BSE OFFSET
		// 0111 xxx xxx xxxxxx
		let src = (instr & 0x0e00) >> 9;
		let bse = (instr & 0x01c0) >> 6;
		let offset = sext((instr & 0x003f) >> 0);
		store.dispatch(
			editMemory(Number(registers[bse] + offset), registers[src])
		);
		return;
	}

	// NOTE RTI
	if (opCode === 'RTI') {
		// RTI
		// 1000 0000 0000 0000
		store.dispatch(editRegister(8, registers[7]));
		return;
	}

	// NOTE NOT
	if (opCode === 'NOT') {
		// NOT  DST SRC
		// 1001 xxx xxx 1 11111
		let dst = (instr & 0x0e00) >> 9;
		let src = (instr & 0x01c0) >> 6;
		store.dispatch(editRegister(dst, ~registers[src]));
		return;
	}

	// NOTE LDI
	if (opCode === 'LDI') {
		// LDI  DST PCOFFSET
		// 1010 xxx xxxxxxxxx
		let dst = (instr & 0x0e00) >> 9;
		let offset = sext((instr & 0x01ff) >> 0);
		store.dispatch(
			editRegister(dst, getMemoryValue(getMemoryValue(pc + offset)))
		);
		return;
	}

	// NOTE STI
	if (opCode === 'STI') {
		// STI  SRC PCOFFSET
		// 1011 xxx xxxxxxxxx
		let src = (instr & 0x0e00) >> 9;
		let offset = sext((instr & 0x01ff) >> 0);
		store.dispatch(editMemory(getMemoryValue(pc + offset), registers[src]));
		return;
	}

	// NOTE JMP
	if (opCode === 'JMP') {
		// JMP      BSE
		// 1100 000 xxx 000000
		let bse = (instr & 0x01c0) >> 6;
		store.dispatch(editRegister(8, registers[bse]));
		return;
	}

	// NOTE reserved
	// TODO implement reserved operations
	if (opCode === 'reserved') {
		// RESERVED
		// 1101 xxxxxxxxxxxx
		return;
	}

	// NOTE LEA
	if (opCode === 'LEA') {
		// LEA  DST PCOFFSET
		// 1110 xxx xxxxxxxxx
		let dst = (instr & 0x0e00) >> 9;
		let offset = sext((instr & 0x01ff) >> 0);
		store.dispatch(editRegister(dst, pc + offset));
		return;
	}

	//TODO evaluate traps
};

export const evaluateAll = () => {
	store.dispatch(clearOutput());
	store.dispatch(appendToOutput('Machine Started'));

	let state = store.getState();
	while (state.running.running) {
		evaluate();
		state = store.getState();
	}
};

const haltFromInvalid = () => {
	store.dispatch(appendToOutput('Invalid Instruction'));
	store.dispatch(appendToOutput('Machine Halted'));
};

const getMemoryValue = (index) => {
	if (index < 0x0000 || index > 0xffff) {
		return -1;
	}
	return store.getState().memory.memoryValues[index];
};
