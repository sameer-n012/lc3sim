export const formatNZP = (nzp) => {
    return (
        ((nzp & 0x4) === 0 ? "-" : "N") +
        ((nzp & 0x2) === 0 ? "-" : "Z") +
        ((nzp & 0x1) === 0 ? "-" : "P")
    );
};
