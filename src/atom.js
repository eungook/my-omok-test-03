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

export {
	colorState,
	playState,
	boardState,
};