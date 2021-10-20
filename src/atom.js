import {
	atom,
	selector,
	DefaultValue,
} from 'recoil';

/**
 * 브라우저 새로고침에도 atom이 유지될 수 있도록 하는 함수
 * @see [Atom Effects: Local Storage Persistence (로컬 스토리지 지속성)](https://recoiljs.org/ko/docs/guides/atom-effects/#local-storage-persistence-%EB%A1%9C%EC%BB%AC-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80-%EC%A7%80%EC%86%8D%EC%84%B1)
 * @param {*} key 
 * @returns 
 */
const localStorageEffect = key => ({ setSelf, onSet }) => {
	const savedValue = localStorage.getItem(key)
	if (savedValue != null) {
		setSelf(JSON.parse(savedValue));
	}

	onSet(newValue => {
		if (newValue instanceof DefaultValue) {
			localStorage.removeItem(key);
		} else {
			localStorage.setItem(key, JSON.stringify(newValue));
		}
	});
};

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
		console.log({
			'where': 'isCanPlayState()',
			color,
			isColor,
		});
		if (isColor == false) {
			return false; // early return
		}

		const last = get(lastState);
		const isLast = (last > '');
		const isFirst = (last == false);
		console.log({
			'where': 'isCanPlayState()',
			last,
			isLast,
			isFirst,
		});
		if (isFirst && color == 'B') {
			return true; // 흑돌 선

		} else if (isLast == false) {
			return false; // early return
		}

		const [y, x] = last;
		const board = get(boardState);
		const isCanPlay = (board[y][x] != color);
		console.log({
			'where': 'isCanPlayState()',
			'board[y][x]': board[y][x],
			color,
			isCanPlay,
		});
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