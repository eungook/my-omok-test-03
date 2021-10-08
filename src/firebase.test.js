import {
	database,
	createRoom,
} from './firebase';

describe('firebase.js', () => {
	it('database', () => {
		expect(database).toBeTruthy();
	});

	it('createRoom()', async () => {
		const newKey = await createRoom();
		console.log({ newKey });
		expect(newKey).toBeTruthy();
	});
});