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
	effects_UNSTABLE: [
		localStorageEffect('colorState'),
	],
});

/**
 * 현재 플레이어의 firebase /room/user/{key}의 recoil
 */
const userState = atom({
	key: 'userState',
	default: '',
	effects_UNSTABLE: [
		localStorageEffect('userState'),
	],
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
		if (isValid === false) {
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
		const isFinish = get(isFinishState);
		console.log({
			'where': 'isCanPlayState()',
			isFinish,
		});
		if (isFinish) {
			return false; // early return
		}

		const color = get(colorState);
		const isColor = (color > '');
		console.log({
			'where': 'isCanPlayState()',
			color,
			isColor,
		});
		if (isColor === false) {
			return false; // early return
		}

		const last = get(lastState);
		const isLast = (last > '');
		const isFirst = (last === false);
		console.log({
			'where': 'isCanPlayState()',
			last,
			isLast,
			isFirst,
		});
		if (isFirst && color === 'B') {
			return true; // 흑돌 선

		} else if (isLast === false) {
			return false; // early return
		}

		const [y, x] = last;
		const board = get(boardState);
		const isCanPlay = (board[y][x] !== color);
		console.log({
			'where': 'isCanPlayState()',
			'board[y][x]': board[y][x],
			color,
			isCanPlay,
		});
		return isCanPlay;
	},
});

/**
 * 게임이 종료된 상태인지 확인하는 atom
 */
const isFinishState = atom({
	key: 'isFinishState',
	default: false,
});

/**
 * 현재 게임 방의 상태를 확인하는 selector
 */
const roomState = selector({
	key: 'roomState',
	get: ({ get }) => {
		const last = get(lastState);
		const isLast = (last > '');
		if (isLast === false) {
			return '흑돌이 둘 차례입니다.';
		}

		const [y, x] = last;
		const board = get(boardState);
		const color = board[y][x];

		const isFinish = get(isFinishState);
		if (isFinish) {
			if (color === 'B') {
				return '흑돌이 이겼습니다.';

			} else if (color === 'W') {
				return '백돌이 이겼습니다.';
			}

		} else {
			if (color === 'B') {
				return '백돌이 둘 차례입니다.';

			} else if (color === 'W') {
				return '흑돌이 둘 차례입니다.';
			}
		}
	},
});

export {
	colorState,
	userState,
	playState,
	boardState,
	lastState,
	isCanPlayState,
	isFinishState,
	roomState,
};