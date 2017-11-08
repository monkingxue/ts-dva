export const getTimeDiff = (time: number): string => {
	const now = new Date().getTime().toString().slice(0, 10);
	const diff = Number(now) - time;

	const units: [[number, string]] =
		[[24 * 3600, '天'], [3600, '小时'], [60, '分钟'], [1, '秒']];

	for (const [unit, name] of units) {
		const result = Math.floor(diff / unit);

		if (result !== 0) {
			return `${result}${name}前`;
		}
	}

	return '刚刚';
};
