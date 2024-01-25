import { Form, FormText, InputGroup } from 'react-bootstrap';
import { dice } from '../../slices/diceSlice';

const DieSelector = (props) => {
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
					value={value.die || ''}
					style={label ? { borderBottom: '1px solid black', borderRight: '0px', borderTop: '0px', borderRadius: '0px' } : { border: '1px solid black' }}
					onChange={(e) => handleChange('die', e.target.value)}>
					{Object.keys(dice).map((die, dieIndex) => {
						return (
							<option key={dieIndex} value={dice[die]}>
								{die}
							</option>
						);
					})}
				</Form.Select>
				<InputGroup.Text style={label ? { backgroundColor: 'transparent', border: '0px' } : { borderColor: 'black' }}>+/-</InputGroup.Text>
				<Form.Control
					{...props}
					type='number'
					onChange={(e) => handleChange('modifier', parseInt(e.target.value))}
					value={value.modifier || ''}
					style={label ? { borderLeft: '0px', borderRight: '0px', borderTop: '0px', borderRadius: '0px' } : {}}
				/>
				{children}
			</InputGroup>
		</div>
	);
};

export default DieSelector;
