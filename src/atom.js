import { atom } from 'recoil';

const colorState = atom({
	key: 'colorState',
	default: '',
});

export {
	colorState,
};