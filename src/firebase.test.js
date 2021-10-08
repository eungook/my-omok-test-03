import {
	database,
	createRoom,
} from './firebase';

describe('firebase.js', () => {
	it('database', () => {
		expect(database).toBeTruthy();
	});

	it('createRoom()', async () => {
		const key = await createRoom();
		console.log({ key });
		expect(key).toBeTruthy();
	});
});