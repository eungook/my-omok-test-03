import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function Join() {
	const history = useHistory();
	const { roomKey } = useParams();
	useEffect(() => {
		const isValid = (roomKey > '');
		if (isValid == false) return; // early return

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