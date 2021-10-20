import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { colorState, userState } from './atom';
import Board from './Board';

function Room() {
	const { roomKey } = useParams();
	const color = useRecoilValue(colorState); // B: 검은 돌, W: 흰 돌
	const user = useRecoilValue(userState);

	useEffect(() => {
		console.log({
			'where': 'Room()',
			roomKey,
		});
	}, [roomKey]);

	return (
		<div>
			<h3>오목방</h3>
			<h4>방번호: {roomKey}</h4>
			<h4>user: {user}</h4>
			<h4>나의 돌 색깔: {
				{ 'W': '흰 돌', 'B': '검은 돌' }[color] || '알 수 없음'
			}</h4>
			<Board
				roomKey={roomKey}
			/>
		</div>
	);
}


export default Room;