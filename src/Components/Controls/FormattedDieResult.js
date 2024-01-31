const FormattedDieResult = (props) => {
	let { die } = props;
	let diceCopy = JSON.parse(JSON.stringify(die));
	diceCopy.modifier = (die.modifier && die.modifier.value) || die.modifier;

	let rangeResult = { variant: undefined, name: undefined };
	diceCopy.ranges &&
		diceCopy.ranges.forEach((range) => {
			let rangeMin = range.min != undefined && (range.min.value || range.min);
			let rangeMax = range.max != undefined && (range.max.value || range.max);
			if (range.min != undefined && diceCopy.total >= rangeMin && range.max != undefined && diceCopy.total <= rangeMax) {
				rangeResult = range;
			} else if (range.min != undefined && diceCopy.total >= rangeMin) {
				rangeResult = range;
			} else if (range.max != undefined && diceCopy.total <= rangeMax) {
				rangeResult = range;
			}
		});

	let resultStyle = {
		border: '1px solid transparent',
		borderColor: 'transparent',
		borderRadius: '4px',
		paddingLeft: '2px',
		paddingRight: '2px',
		textWrap: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		display: 'inline',

	};
	if (rangeResult.variant === 'success') {
		resultStyle.borderColor = '#198754';
		resultStyle.backgroundColor = '#198754';
		resultStyle.color = 'white';
	}
	if (rangeResult.variant === 'failure') {
		resultStyle.borderColor = '#dc3545';
		resultStyle.backgroundColor = '#dc3545';
		resultStyle.color = 'white';
	}
	return (
		<div style={resultStyle} title={rangeResult.name}>
			{die.name}
			{die.name && ': '}
			{diceCopy.number}d{diceCopy.die}
			{diceCopy.rolls && <>={die.rolls.join('+')}</>}
			{!isNaN(diceCopy.modifier) && diceCopy.modifier !== 0 && (
				<>
					{diceCopy.modifier > -1 ? '+' : ''}
					{diceCopy.modifier}
				</>
			)}{' '}
			{rangeResult.name}
		</div>
	);
};

export default FormattedDieResult;
