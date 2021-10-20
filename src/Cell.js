function Cell(props) {
	const { children, onClick, isCanPlay } = props;
	return (
		<button
			onClick={onClick}
			{...((isCanPlay == false) && { disabled: true })}
		>
			{children}
		</button>
	);
}

export default Cell;