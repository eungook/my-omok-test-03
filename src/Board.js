import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createRoom, joinRoom, playStone, addOnValuePlayListener } from './firebase';
import { isOmok } from './omok';
import { colorState, playState, boardState, lastState, isCanPlayState } from './atom';
import Cell from './Cell';

function Board(props) {
	const { roomKey } = props;

	const [color, setColor] = useRecoilState(colorState); // B: 검은 돌, W: 흰 돌
	const [play, setPlay] = useRecoilState(playState);
	const board = useRecoilValue(boardState);
	const last = useRecoilValue(lastState);
	const isCanPlay = useRecoilValue(isCanPlayState);

	useEffect(() => addOnValuePlayListener(roomKey, (snapshot) => {
		const isValid = snapshot.exists();
		if (isValid == false) {
			return; // early return
		}

		const play = snapshot.val();
		console.log({
			'where': '<Board />: addOnValuePlayListener()',
			play,
		});

		setPlay(play);
	}), []);

	useEffect(() => {
		console.log({
			'where': 'useEffect([play])',
			play,
		});
	}, [play]);

	useEffect(() => {
		const isValid = (last > '');
		if (isValid == false) {
			return; // early return
		}

		const [y, x] = last;
		const color = board[y][x];
		const isWin = isOmok(board, last, color);
		console.log({
			'where': 'useEffect([board])',
			last,
			color,
			board,
			isWin,
		});

		if (isWin) {
			alert(`${color === 'B' ? '흑돌' : '백돌'}이 이겼습니다!`);
		}
	}, [board]);

	return (
		<>
			<div id="div-board">
				{board.map((row, y) => {
					console.log({
						'where': 'board.map()',
						row,
					});

					return (
						<div key={`row-${y}`}>
							{row.map((cell, x) => {
								return (
									<Cell
										key={`cell-${y}-${x}`}
										onClick={() => onClickCell([y, x])}
										isCanPlay={isCanPlay}
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
	 * @param {*} yx [y, x] 오목판 y좌표, x좌표 (index)
	 */
	async function onClickCell([y, x]) {
		const isValid = isAlready(y, x) == false;
		if (isValid == false) return; // early return

		await playStone(roomKey, color, [y, x]);

		// toggleColor();
	}
}

export default Board;