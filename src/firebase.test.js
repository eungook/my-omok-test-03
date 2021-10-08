import { database } from './firebase';

describe('firebase.js', () => {
	it('database', () => {
		expect(database).toBeTruthy();
	})
});