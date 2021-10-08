import {
	database,
	createRoom,
	joinRoom,
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

	it('joinRoom()', async () => {
		const roomKey = await createRoom();
		console.log({ roomKey });
		expect(roomKey).toBeTruthy();

		const color = 'B'; // B: 검은 돌
		const userKey = await joinRoom(roomKey, color);
		console.log({ userKey });
		expect(userKey).toBeTruthy();
	});
});