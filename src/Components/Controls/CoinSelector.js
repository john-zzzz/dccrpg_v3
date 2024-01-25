import { Form, InputGroup } from 'react-bootstrap';
import { dccReferences } from '../../references/dccReferences';


const CoinSelector = (props) => {
	const { label, value, onChange } = props;

	const coinTypes = dccReferences.coinTypes;
	
	const handleChange = (propertyPath, newValue) => {
        // let newProperty = { ...value, [propertyPath]: newValue }
		// setValue(newProperty);

		onChange && onChange(propertyPath, newValue);
	};

	return (
		<div>
             {/* className='form-control'> */}
			{/* <label style={{ transform: 'scale(.85)', color: 'rgba(var(--bs-body-color-rgb),.65)' }}>{label}</label> */}
			<InputGroup>
				<Form.Control
					type='number'
					value={(value && value.number) || ''}
					onChange={(e) => handleChange('number', parseInt(e.target.value))}
					// style={{ borderLeft: '0px', borderTop: '0px', borderRadius: '0px' }}
				/>
				<Form.Select style={{borderColor: 'black'}}
					value={value && value.coinType? value.coinType.key : ''}
					// style={{ borderRight: '0px', borderTop: '0px', borderRadius: '0px' }}
					onChange={(e) => handleChange('coinType', e.target.value)}>
					{Object.keys(coinTypes).map((coinType, coinTypeIndex) => {
						return (
							<option key={coinTypeIndex} value={coinType}>
								{coinTypes[coinType].abbreviation}
							</option>
						);
					})}
				</Form.Select>
			</InputGroup>
		</div>
	);
};

export default CoinSelector;
