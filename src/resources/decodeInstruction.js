import { opCodeToString } from "../computer/opcodeDict";
import { convertToString, sext } from "./numberConversions";

export const describeInstruction = (instr, memory, registers) => {
    if (instr < 0x0000 || instr > 0xffff) {
        return "INVALID";
    }

    const opCode = opCodeToString(instr);

    // NOTE INVALID
    if (opCode === "INVALID") {
        return "INVALID";
    }

    // NOTE NOP
    if (opCode === "NOP") {
        // NOP
        // 0000 0000 0000 0000
        return "NOP";
    }

    // NOTE BR
    if (opCode === "BR") {
        // BR   NZP PCOFFSET
        // 0000 xxx xxxxxxxxx
        let n = (instr & 0x0800) >> 11 ? "N" : "-";
        let z = (instr & 0x0400) >> 10 ? "Z" : "-";
        let p = (instr & 0x0200) >> 9 ? "P" : "-";
        let offset = sext((instr & 0x01ff) >> 0);
        return `BR(${n}${z}${p}, ${convertToString(
            offset + registers[8] + 1,
            "hex",
            "4",
        )})`;
    }

    // NOTE ADD_R
    if (opCode === "ADD_R") {
        // ADD  DST SRC     SRC
        // 0001 xxx xxx 000 xxx
        let dst = (instr & 0x0e00) >> 9;
        let src1 = (instr & 0x01c0) >> 6;
        let src2 = (instr & 0x0007) >> 0;
        return `R${dst} <- ADD(R${src1}, R${src2})`;
    }

    // NOTE ADD_I
    if (opCode === "ADD_I") {
        // ADD  DST SRC   IMM
        // 0001 xxx xxx 1 xxxxx
        let dst = (instr & 0x0e00) >> 9;
        let src1 = (instr & 0x01c0) >> 6;
        let imm = sext((instr & 0x001f) >> 0);
        return `R${dst} <- ADD(R${src1}, ${convertToString(imm, "hex", 4)})`;
    }

    // NOTE LD
    if (opCode === "LD") {
        // LD   DST PCOFFSET
        // 0010 xxx xxxxxxxxx
        let dst = (instr & 0x0e00) >> 9;
        let offset = sext((instr & 0x01ff) >> 0);
        return `R${dst} <- LD(${convertToString(
            offset + registers[8] + 1,
            "hex",
            "4",
        )})`;
    }

    // NOTE ST
    if (opCode === "ST") {
        // ST   SRC PCOFFSET
        // 0011 xxx xxxxxxxxx
        let src = (instr & 0x0e00) >> 9;
        let offset = sext((instr & 0x01ff) >> 0);
        return `${convertToString(
            offset + registers[8] + 1,
            "hex",
            "4",
        )} <- ST(R${src})`;
    }

    // NOTE JSR_P
    if (opCode === "JSR_P") {
        // JSR    PCOFFSET
        // 0100 1 xxxxxxxxxxx
        let offset = sext((instr & 0x07ff) >> 0);
        return `JSR(${convertToString(offset + registers[8] + 1, "hex", "4")})`;
    }

    // NOTE JSR_B
    if (opCode === "JSR_B") {
        // JSR       BSE
        // 0100 0 00 xxx 000000
        let bse = (instr & 0x01c0) >> 6;
        return `JSR(R${bse})`;
    }

    // NOTE AND_R
    if (opCode === "AND_R") {
        // AND  DST SRC      SRC
        // 0101 xxx xxx 0 00 xxx
        let dst = (instr & 0x0e00) >> 9;
        let src1 = (instr & 0x01c0) >> 6;
        let src2 = (instr & 0x0007) >> 0;
        return `R${dst} <- AND(R${src1}, R${src2})`;
    }

    // NOTE AND_I
    if (opCode === "AND_I") {
        // AND  DST SRC   IMM
        // 0101 xxx xxx 1 xxxxx
        let dst = (instr & 0x0e00) >> 9;
        let src1 = (instr & 0x01c0) >> 6;
        let imm = (instr & 0x0001f) >> 0; // QUESTION should this be sign extended
        return `R${dst} <- AND(R${src1}, ${convertToString(imm, "hex", "4")})`;
    }

    // NOTE LDR
    if (opCode === "LDR") {
        // LDR  DST BSE OFFSET
        // 0110 xxx xxx xxxxxx
        let dst = (instr & 0x0e00) >> 9;
        let bse = (instr & 0x01c0) >> 6;
        let offset = sext((instr & 0x003f) >> 0);
        return `R${dst} <- M[${convertToString(
            offset + registers[bse],
            "hex",
            "4",
        )}]`;
    }

    // NOTE STR
    if (opCode === "STR") {
        // STR  SRC BSE OFFSET
        // 0111 xxx xxx xxxxxx
        let src = (instr & 0x0e00) >> 9;
        let bse = (instr & 0x01c0) >> 6;
        let offset = sext((instr & 0x003f) >> 0);
        return `${convertToString(
            offset + registers[bse],
            "hex",
            "4",
        )} <- STR(R${src})`;
    }

    // NOTE RTI
    if (opCode === "RTI") {
        // RTI
        // 1000 0000 0000 0000
        return `RTI`;
    }

    // NOTE NOT
    if (opCode === "NOT") {
        // NOT  DST SRC
        // 1001 xxx xxx 1 11111
        let dst = (instr & 0x0e00) >> 9;
        let src = (instr & 0x01c0) >> 6;
        return `R${dst} <- NOT(R${src})`;
    }

    // NOTE LDI
    if (opCode === "LDI") {
        // LDI  DST PCOFFSET
        // 1010 xxx xxxxxxxxx
        let dst = (instr & 0x0e00) >> 9;
        let offset = sext((instr & 0x01ff) >> 0);
        return `R${dst} <- LDI(${convertToString(
            offset + registers[8],
            "hex",
            "4",
        )})`;
    }

    // NOTE STI
    if (opCode === "STI") {
        // STI  SRC PCOFFSET
        // 1011 xxx xxxxxxxxx
        let src = (instr & 0x0e00) >> 9;
        let offset = sext((instr & 0x01ff) >> 0);
        return `${convertToString(
            offset + registers[8],
            "hex",
            "4",
        )} <- STI(R${src})`;
    }

    // NOTE JMP
    if (opCode === "JMP") {
        // JMP      BSE
        // 1100 000 xxx 000000
        let bse = (instr & 0x01c0) >> 6;
        return `JMP(R${bse})`;
    }

    // NOTE reserved
    // TODO implement reserved operations
    if (opCode === "reserved") {
        // RESERVED
        // 1101 xxxxxxxxxxxx
        return `RESERVED`;
    }

    // NOTE LEA
    if (opCode === "LEA") {
        // LEA  DST PCOFFSET
        // 1110 xxx xxxxxxxxx
        let dst = (instr & 0x0e00) >> 9;
        let offset = sext((instr & 0x01ff) >> 0);
        return `R${dst} <- LEA(${convertToString(
            offset + registers[8],
            "hex",
            "4",
        )})`;
    }

    // NOTE TRAP_G
    if (opCode === "TRAP_G") {
        // TRAP      TRPVEC
        // 1111 0000 xxxxxxxxx
        return `TRAP(GET)`;
    }

    // NOTE TRAP_O
    if (opCode === "TRAP_O") {
        // TRAP      TRPVEC
        // 1111 0000 xxxxxxxxx
        return `TRAP(OUT)`;
    }

    // NOTE TRAP_P
    if (opCode === "TRAP_P") {
        // TRAP      TRPVEC
        // 1111 0000 xxxxxxxxx
        return `TRAP(PUT)`;
    }

    // NOTE TRAP_I
    if (opCode === "TRAP_I") {
        // TRAP      TRPVEC
        // 1111 0000 xxxxxxxxx
        return `TRAP(IN)`;
    }

    // NOTE TRAP_H
    if (opCode === "TRAP_H") {
        // TRAP      TRPVEC
        // 1111 0000 xxxxxxxxx
        return `TRAP(HALT)`;
    }

    // NOTE TRAP
    if (opCode === "TRAP") {
        // TRAP      TRPVEC
        // 1111 0000 xxxxxxxxx
        let trpvec = (instr & 0x00ff) >> 0; // QUESTION should this be sign extended
        return `TRAP(${convertToString(trpvec, "hex", 4)})`;
    }

    //TODO finish implementing code descriptions

    return "INVALID";
};
