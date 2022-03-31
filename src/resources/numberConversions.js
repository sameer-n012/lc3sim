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
				'x must be negative when converting to unsigned binary integer format'
			);
		}
		return String(x.toString(2)).padStart(digits ? digits : 16, '0');
	}

	if (endType === '2scomp_binary') {
		if (x < 0) {
			throw Error(
				'x must be negative when converting to unsigned binary integer format'
			);
		}
		return String((~x + 1).toString(2)).padStart(digits ? digits : 16, '0');
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
	}

	return NaN;
};
