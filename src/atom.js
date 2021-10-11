import { atom } from 'recoil';

const colorState = atom({
	key: 'colorState',
	default: '', // B: 검은 돌, W: 흰 돌
});

export {
	colorState,
};