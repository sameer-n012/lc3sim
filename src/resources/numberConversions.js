export const convertToString = (x, endType, digits) => {
	if (digits < 0) {
		throw Error('digits must be positive');
	}

	if (endType === 'dec') {
		return String(x.toString(10)).padStart(digits ? digits : 6, '0');
	}

	if (endType === 'hex') {
		return (
			'0x' +
			String(x.toString(16))
				.toUpperCase()
				.padStart(digits ? digits : 4, '0')
		);
	}

	if (endType === 'uint_binary') {
		if (x < 0) {
			throw Error(
				'x must not be negative when converting to unsigned binary integer format'
			);
		}
		return String(x.toString(2)).padStart(digits ? digits : 16, '0');
	}

	if (endType === '2scomp_binary') {
		return String((~x + 1).toString(2)).padStart(
			digits ? digits : 16,
			(~x + 1)[0] === '0' ? '0' : '1'
		);
	}

	return null;
};

export const convertToNumber = (s, startType) => {
	if (startType === 'uint_binary') {
		let x = 0;
		for (let i = s.length - 1; i >= 0; i--) {
			x += Number(s[i]) * Math.pow(2, s.length - i - 1);
		}
		return x;
	} else if (startType === '2scomp_binary') {
		if (s.length === 0) {
			return 0;
		}

		let x = 0;
		if (x >= 0) {
			let twosComp = x.toString(2);
			return (Array(twosComp.length).fill('0').join('') + twosComp).slice(
				twosComp.length * -1
			);
		} else {
			return (Math.pow(2, x.length) + x).toString(2);
		}
	}

	return NaN;
};

// FIXME check sign extending method
// get sign extended 2s complement in hex
export const sext = (x) => {
	return convertToNumber(x.toString(2), '2scomp_binary');
};
