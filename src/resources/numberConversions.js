export const convertToString = (x, endType, digits) => {
    if (digits < 0) {
        throw Error("digits must be positive");
    }

    if (endType === "dec") {
        return String(x.toString(10)).padStart(digits ? digits : 6, "0");
    } else if (endType === "hex") {
        return (
            "0x" +
            String(x.toString(16))
                .toUpperCase()
                .padStart(digits ? digits : 4, "0")
        );
    } else if (endType === "uint_binary") {
        if (x < 0) {
            throw Error(
                "x must not be negative when converting to unsigned binary integer format",
            );
        }
        return String(x.toString(2)).padStart(digits ? digits : 16, "0");
    } else if (endType === "2scomp_binary") {
        return String((~x + 1).toString(2)).padStart(
            digits ? digits : 16,
            (~x + 1)[0] === "0" ? "0" : "1",
        );
    } else if (endType === "ascii_hp") {
        return String.fromCharCode(x);
    } else if (endType === "ascii_fp") {
        return String.fromCharCode(x);
    }

    return null;
};

export const convertToNumber = (s, startType) => {
    if (startType === "uint_binary") {
        return parseInt(s, 2);
    } else if (startType === "2scomp_binary") {
        let value = parseInt(s, 2);

        if ((value & (1 << (s - 1))) > 0) {
            value = value - (1 << s);
        }
        return value;
    } else if (startType === "ascii_hp") {
        return s.charCodeAt(0) & 0x00ff;
    }

    return NaN;
};

export const sext = (s) => {
    if (s.length > 16) {
        return null;
    }

    if (s.length === 16) {
        return s;
    }

    return convertToNumber(s[0].repeat(16 - s.length) + s, "2scomp_binary");
};
