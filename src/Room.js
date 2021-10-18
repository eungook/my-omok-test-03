import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { colorState } from './atom';
import Board from './Board';

function Room() {
	const { roomKey } = useParams();
	const [color, setColor] = useRecoilState(colorState); // B: 검은 돌, W: 흰 돌

	useEffect(() => {
		console.log({
			'where': 'Room()',
			roomKey,
		});
	}, []);

	return (
		<div>
			<h3>오목방</h3>
			<h4>방번호: {roomKey}</h4>
			<h4>나의 돌 색깔: {(color == 'W') ? '흰 돌' : '검은 돌'}</h4>
			<Board />
		</div>
	);
}


export default Room;