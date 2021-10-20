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

/**
 * 오목 게임에서 현재 내가 돌을 놓을 수 있는 상태인지를 확인하는 selector
 */
const isCanPlayState = selector({
	key: 'isCanPlayState',
	get: ({ get }) => {
		const color = get(colorState);
		const isColor = (color > '');
		if (isColor == false) {
			return false; // early return
		}

		const last = get(lastState);
		const isLast = (last > '');
		if (isLast == false) {
			return false; // early return
		}

		const [y, x] = last;
		const board = get(boardState);
		const isCanPlay = (board[y][x] != color);
		return isCanPlay;
	},
});

export {
	colorState,
	playState,
	boardState,
	lastState,
	isCanPlayState,
};