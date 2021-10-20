import { atom, selector } from 'recoil';

const colorState = atom({
	key: 'colorState',
	default: '', // B: 검은 돌, W: 흰 돌
});

/**
 * firebase /room/{roomKey}/play의 recoil
 */
const playState = atom({
	key: 'playState',
	default: {},
});

/**
 * `<Board />`를 위한 playState의 Selector
 */
const boardState = selector({
	key: 'boardState',
	get: ({ get }) => {
		const board = [
			// 0 . 1 .. 2 .. 3 .. 4 .. 5 .. 6 .. 7 .. 8 .. 9 ..
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 0
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 1
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 2
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 3
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 4
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 5
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 6
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 7
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 8
			['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 9
		];

		const play = get(playState);
		const list = Object.values(play);
		list.forEach(item => {
			const { color, yx } = item;
			const [y, x] = yx;
			board[y][x] = color;
		});

		console.log({
			'where': 'boardState = selector()',
			list,
			board,
		});

		return board;
	}
});

/**
 * 오목 게임에서 마지막으로 돌이 놓인 좌표의 selector
 * omok.js의 isOmok() 체크를 위해 만들었다.
 * @returns yx [y, x], false: 아직 시작하지 않은 오목 게임
 */
const lastState = selector({
	key: 'lastState',
	get: ({ get }) => {
		const play = get(playState);
		const list = Object.values(play);
		const isValid = (list.length > 0);
		if (isValid == false) {
			return false; // early return
		}

		const last = list[list.length - 1];
		const { yx } = last;
		return yx;
	}
});

export {
	colorState,
	playState,
	boardState,
	lastState,
};