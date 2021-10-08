function Cell(props) {
	const { children, onClick } = props;
	return <button onClick={onClick}>{children}</button>;
}

export default Cell;