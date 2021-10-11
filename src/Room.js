import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Board from './Board';

function Room() {
	const { roomKey } = useParams();
	useEffect(() => {
		console.log({
			'where': 'Room()',
			roomKey,
		});
	}, []);

	return (
		<div>
			<h3>오목방</h3>
			<h4>방번호: </h4>
			<Board />
		</div>
	);
}


export default Room;