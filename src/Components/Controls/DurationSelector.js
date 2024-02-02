import { Form, InputGroup } from 'react-bootstrap';
import { dice } from '../../slices/diceSlice';
import { timeUnits } from '../../references/dcc/timeUnits';

const DurationSelector = (props) => {
	const { label, value, onChange, children } = props;

	const handleChange = (property, value) => {
		onChange && onChange(property, value);
	};

	if (!value) return <div></div>;

	return (
		<div className={label ? 'labeled-form-control' : ''}>
			{label && <label style={{ transform: 'scale(.85)', color: 'rgba(var(--bs-body-color-rgb),.65)' }}>{label}</label>}
			<InputGroup>
				<Form.Control
					{...props}
					type='number'
					value={value.number || ''}
					onChange={(e) => handleChange('number', parseInt(e.target.value))}
					style={label ? { borderLeft: '0px', borderTop: '0px', borderRadius: '0px' } : {}}
				/>
				<Form.Select
					{...props}
					value={value.timeUnit || ''}
					style={label ? { borderBottom: '1px solid black', borderRight: '0px', borderTop: '0px', borderRadius: '0px' } : { border: '1px solid black' }}
					onChange={(e) => handleChange('timeUnit', e.target.value)}>
					{Object.keys(timeUnits).map((timeUnit, timeUnitIndex) => {
						return (
							<option key={timeUnitIndex} value={timeUnit}>
								{timeUnits[timeUnit].name}
							</option>
						);
					})}
				</Form.Select>
				{children}
			</InputGroup>
		</div>
	);
};

export default DurationSelector;
