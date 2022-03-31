export const validateNumberBounds = (x, a = 0, b = 0xffff) => {
	x = Number(x);
	if (x < a || x > b || (!x && x !== 0)) {
		return false;
	}
	return true;
};
