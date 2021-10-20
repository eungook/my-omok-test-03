import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { createRoom, joinRoom } from './firebase';
import { colorState, userState } from './atom';

function Create() {
	const history = useHistory();
	const [color, setColor] = useRecoilState(colorState); // B: 검은 돌, W: 흰 돌
	const [user, setUser] = useRecoilState(userState);

	return (
		<div>
			<h3>새 방 만들기</h3>
			<form onSubmit={onSubmitForm}>
				<h4>먼저 돌을 골라주세요.</h4>
				<ul>
					<li>
						<label htmlFor="B">검은 돌</label>
						<input id="B" type="radio" name="color" value="B" checked readOnly /></li>
					<li>
						<label htmlFor="W">흰 돌</label>
						<input id="W" type="radio" name="color" value="W" />
					</li>
				</ul>
				<p>
					<button>방 만들기</button>
				</p>
			</form>
		</div>
	);

	/**
	 * 방 만들기 form의 onSubmit
	 * @param {SyntheticBaseEvent} e 
	 */
	async function onSubmitForm(e) {
		e.preventDefault();

		const form = e.target;
		const color = form.color.value;
		setColor(color);

		const roomKey = await createRoom();
		const userKey = await joinRoom(roomKey, color);
		setUser(userKey);

		console.log({
			'where': 'onSubmitForm()',
			roomKey,
			userKey,
		});

		const url = `/room/${roomKey}`;
		history.replace(url);
	}
}

export default Create;