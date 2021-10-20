/**
 * 오목이 완성되었는지 확인
 * @param {*} board 오목판, 10x10
 * @param {*} last 마지막에 둔 곳, [y, x]
 * @param {*} color 색깔: B, W
 * @returns {Boolean} 완성 여부
 */
function isOmok(board, last, color) {
	const isColor = (color == 'B' || color == 'W');
	const isValid = (isColor);
	if (isValid == false) {
		return false; // early return
	}

	return (
		isOmokVertical(board, last, color) ||
		isOmokHorizontal(board, last, color) ||
		isOmokSlash(board, last, color) ||
		isOmokBackslash(board, last, color)
	);
}

/**
 * (|) 세로로 오목이 완성됐는지 확인
 * @param {*} board 오목판, 10x10
 * @param {*} last 마지막에 둔 곳, [y, x]
 * @param {*} color 색깔: B, W
 * @returns {Boolean} 완성 여부
 */
function isOmokVertical(board, last, color) {
	const [y, x] = last;
	let count = 1; // last에서부터 시작
	console.log({ last });

	// up
	const up = [y - 1, x];
	console.log({ up });
	while (isSameColor(board, up, color)) {
		count++;
		up[0]--; // [0]: y // up
		console.log({ up });
	}

	// down
	const down = [y + 1, x];
	console.log({ down });
	while (isSameColor(board, down, color)) {
		count++;
		down[0]++; // [0]: y // down
		console.log({ down });
	}

	const isOmok = count >= 5;
	console.log({ count });
	return isOmok;
}

/**
 * (-) 가로로 오목이 완성됐는지 확인
 * @param {*} board 오목판, 10x10
 * @param {*} last 마지막에 둔 곳, [y, x]
 * @param {*} color 색깔: B, W
 * @returns {Boolean} 완성 여부
 */
function isOmokHorizontal(board, last, color) {
	const [y, x] = last;
	let count = 1; // last에서부터 시작
	console.log({ last });

	// left
	const left = [y, x - 1];
	console.log({ left });
	while (isSameColor(board, left, color)) {
		count++;
		left[1]--; // [1]: x // left
		console.log({ left });
	}

	// right
	const right = [y, x + 1];
	console.log({ right });
	while (isSameColor(board, right, color)) {
		count++;
		right[1]++; // [1]: x // right
		console.log({ right });
	}

	const isOmok = count >= 5;
	console.log({ count });
	return isOmok;
}

/**
 * (/) 우상단에서 좌하단으로 오목이 완성됐는지 확인
 * @param {*} board 오목판, 10x10
 * @param {*} last 마지막에 둔 곳, [y, x]
 * @param {*} color 색깔: B, W
 * @returns {Boolean} 완성 여부
 */
function isOmokSlash(board, last, color) {
	const [y, x] = last;
	let count = 1; // last에서부터 시작
	console.log({ last });

	// upRight
	const upRight = [y - 1, x + 1];
	console.log({ upRight });
	while (isSameColor(board, upRight, color)) {
		count++;
		upRight[0]--; // [0]: y // up
		upRight[1]++; // [1]: x // right
		console.log({ upRight });
	}

	// downLeft
	const downLeft = [y + 1, x - 1];
	console.log({ downLeft });
	while (isSameColor(board, downLeft, color)) {
		count++;
		downLeft[0]++; // [0]: y // down
		downLeft[1]--; // [1]: x // left
		console.log({ downLeft });
	}

	const isOmok = count >= 5;
	console.log({ count });
	return isOmok;
}

/**
 * (\\) 좌상단에서 우하단으로 오목이 완성됐는지 확인
 * @param {*} board 오목판, 10x10
 * @param {*} last 마지막에 둔 곳, [y, x]
 * @param {*} color 색깔: B, W
 * @returns {Boolean} 완성 여부
 */
function isOmokBackslash(board, last, color) {
	const [y, x] = last;
	let count = 1; // last에서부터 시작
	console.log({ last });

	// upLeft
	const upLeft = [y - 1, x - 1];
	console.log({ upLeft });
	while (isSameColor(board, upLeft, color)) {
		count++;
		upLeft[0]--; // [0]: y // up
		upLeft[1]--; // [1]: x // left
		console.log({ upLeft });
	}

	// downRight
	const downRight = [y + 1, x + 1];
	console.log({ downRight });
	while (isSameColor(board, downRight, color)) {
		count++;
		downRight[0]++; // [0]: y // down
		downRight[1]++; // [1]: x // right
		console.log({ downRight });
	}

	const isOmok = count >= 5;
	console.log({ count });
	return isOmok;
}

/**
 * 같은 색깔인지 확인
 * @param {*} board 오목판, 10x10
 * @param {*} yx 위치, [y, x]
 * @param {*} color 색깔: B, W
 * @returns {Boolean} 같은지 여부
 */
function isSameColor(board, yx, color) {
	const isValid = isValidYX(yx);
	if (isValid == false) return false; // early return

	const [y, x] = yx;
	if (board[y][x] == color) {
		return true;
		//
	} else {
		return false;
	}
}

/**
 * 유효한 위치의 좌표인지 확인
 * @param {*} yx
 * @returns {Boolean} 유효한지 여부
 */
function isValidYX(yx) {
	const [y, x] = yx;
	if ((0 <= y && y <= 9) == false) return false; // early return
	if ((0 <= x && x <= 9) == false) return false; // early return
	return true;
}

export { isOmok };