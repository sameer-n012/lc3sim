export const getMemoryAddress = (offset, format, memory, registers) => {
    if (format === "pc_indirect") {
        return registers[8] + offset + 1;
    }
    return 0;
};
