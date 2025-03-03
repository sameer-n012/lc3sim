import { convertToString } from "./numberConversions";

export const readProgram = (program) => {
    return new Array(0x10000).fill(0);
};

export const writeProgram = async (memory, pc) => {
    let out = "";

    out += ".ORIG $" + convertToString(pc, "hex", 4).slice(2) + "\n";

    let i = 0;
    while (i < memory.length) {
        if (memory[i] !== 0x0000) {
            let tmp = "";
            while (i < memory.length && memory[i] !== 0x0000) {
                tmp += String.fromCharCode(memory[i]);
                i++;
            }
            out += '.STRINGZ "' + tmp + '"\n';
        } else {
            let c = 0;
            while (i < memory.length && memory[i] === 0x0000) {
                c++;
                i++;
            }
            out += ".BLKW " + c + " #0\n";
        }
    }
    out += ".END";

    return out;
};
