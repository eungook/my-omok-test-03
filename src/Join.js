import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getRoomSnapshot, joinRoom } from './firebase';
import { colorState, userState } from './atom';

function Join() {
	const history = useHistory();
	const { roomKey } = useParams();
	const [color, setColor] = useRecoilState(colorState); // B: 검은 돌, W: 흰 돌
	const [user, setUser] = useRecoilState(userState);

	useEffect(async () => {
		const snapshot = await getRoomSnapshot(roomKey);
		console.log({
			'where': 'Join()',
			snapshot,
		});

		const isValid = (snapshot > '');
		if (isValid == false) return; // early return

		const user = Object.values(snapshot.user)[0];
		let { color } = user;
		console.log({
			'where': 'Join()',
			color,
		});
		color = (color == 'W') ? 'B' : 'W';
		setColor(color);
		const userKey = await joinRoom(roomKey, color);
		setUser(userKey);

		const url = `/room/${roomKey}`;
		history.replace(url);

	}, [roomKey]);

	return (
		<div>
			<h3>오목 방에 들어갑니다.</h3>
		</div>
	);
}

export default Join;