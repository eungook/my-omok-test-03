import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { createRoom, joinRoom } from './firebase';
import { isOmok } from './omok';
import { colorState } from './atom';
import Cell from './Cell';

function Board(props) {
	const [color, setColor] = useRecoilState(colorState); // B: 검은 돌, W: 흰 돌

	useEffect(() => componentDidMount(), []);
	async function componentDidMount() {
		const roomKey = await createRoom();
		const color = 'B'; // B: 검은 돌
		const userKey = await joinRoom(roomKey, color);

		setColor(color);

		console.log({
			where: 'Board.js, componentDidMount()',
			roomKey,
			color,
			userKey,
		});

		return userKey;
	}

	useEffect(() => {
		console.log({
			'where': 'useEffect([color])',
			color,
		});
	}, [color]);

	const [board, setBoard] = useState([
		// 0 . 1 .. 2 .. 3 .. 4 .. 5 .. 6 .. 7 .. 8 .. 9 ..
		['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 0
		['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 1
		['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 2
		['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 3
		['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 4
		['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 5
		['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 6
		['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 7
		['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 8
		['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'], // 9
	]);

	return (
		<>
			<div id="div-board">
				{board.map((row, y) => {
					return (
						<div key={`row-${y}`}>
							{row.map((cell, x) => {
								return (
									<Cell
										key={`cell-${y}-${x}`}
										onClick={() => onClickCell(y, x)}
									>
										{cell}
									</Cell>
								);
							})}
						</div>
					);
				})}
			</div>
			<style jsx>{`
			button {
				width: 50px;
				height: 50px;
			}
		`}</style>
		</>
	);

	/**
	 * 오목판에 이미 돌이 있는지
	 * @param {*} y 오목판 y좌표 (index)
	 * @param {*} x 오목판 x좌표 (index)
	 * @returns 있는지 여부
	 */
	function isAlready(y, x) {
		const color = board[y][x];
		return color === 'B' || color === 'W';
	}

	/**
	 * 돌 색깔을 토글합니다.
	 *
	 * 검은 돌-> 흰 돌, 흰 돌-> 검은 돌
	 */
	function toggleColor() {
		const nextColor = color === 'B' ? 'W' : 'B';
		setColor(nextColor);
	}

	/**
	 * 오목판을 클릭합니다.
	 * @param {*} y 오목판 y좌표 (index)
	 * @param {*} x 오목판 x좌표 (index)
	 */
	function onClickCell(y, x) {
		const isValid = isAlready(y, x) == false;
		if (isValid == false) return; // early return

		board[y][x] = color;
		setBoard(board);

		const last = [y, x];
		const isWin = isOmok(board, last, color);
		if (isWin) {
			alert(`${color === 'B' ? '흑돌' : '백돌'}이 이겼습니다!`);
		}

		toggleColor();
	}
}

export default Board;