import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Col, Form, InputGroup, Row } from 'react-bootstrap';
import TextInput from './TextInput';
import { deepCopy } from '../../utilities/deepObjects';

const MoneySelector = (props) => {
	let { value, onChange } = props;

	const sv = (propertyPath, value) => {
		onChange(propertyPath, value);
	};

	const handleCurrencyTransfer = (fromCurrency, toCurrency) => {
		let toValue = deepCopy(value[toCurrency] || 0);
		let fromValue = deepCopy(value[fromCurrency] || 0);

		if (
			(fromCurrency === 'copper' && toCurrency === 'silver') ||
			(fromCurrency === 'silver' && toCurrency === 'gold') ||
			(fromCurrency === 'gold' && toCurrency === 'platinum') ||
			(fromCurrency === 'platinum' && toCurrency === 'electrum')
		) {
			//Going 'up'
			if (fromValue <= 10) return;

			onChange(fromCurrency, fromValue - 10);
			onChange(toCurrency, toValue + 1);
		} else {
			//Going 'down'
			if (fromValue < 1) return;

			onChange(fromCurrency, fromValue - 1);
			onChange(toCurrency, toValue + 10);
		}
	};
	const transferButtonStyle = {
		// border: 'var(--bs-border-width) solid var(--bs-border-color)',
		
		height: '50%',
		fontSize: '.8rem',
		borderRadius: '0px'
	};
	return (
		<div>
			<InputGroup>
				<TextInput type='number' style={{textAlign:'center'}} label='Copper' value={value.copper || ''} onChange={(e) => sv('copper', parseInt(e.target.value))} />
				<ButtonGroup vertical>
					<Button style={transferButtonStyle} variant='outline-secondary' size='sm' onClick={() => handleCurrencyTransfer('silver', 'copper')}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</Button>
					<Button style={transferButtonStyle} variant='outline-secondary' size='sm' onClick={() => handleCurrencyTransfer('copper', 'silver')}>
						<FontAwesomeIcon icon={faArrowRight} />
					</Button>
				</ButtonGroup>
				<TextInput type='number' style={{textAlign:'center'}} label='Silver' value={value.silver || ''} onChange={(e) => sv('silver', parseInt(e.target.value))} />
				<ButtonGroup vertical>
					<Button style={transferButtonStyle} variant='outline-secondary' size='sm' onClick={() => handleCurrencyTransfer('gold', 'silver')}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</Button>
					<Button style={transferButtonStyle} variant='outline-secondary' size='sm' onClick={() => handleCurrencyTransfer('silver', 'gold')}>
						<FontAwesomeIcon icon={faArrowRight} />
					</Button>
				</ButtonGroup>
				<TextInput type='number' style={{textAlign:'center'}} label='Gold' value={value.gold || ''} onChange={(e) => sv('gold', parseInt(e.target.value))} />
				<ButtonGroup vertical>
					<Button style={transferButtonStyle} variant='outline-secondary' size='sm' onClick={() => handleCurrencyTransfer('platinum', 'gold')}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</Button>
					<Button style={transferButtonStyle} variant='outline-secondary' size='sm' onClick={() => handleCurrencyTransfer('gold', 'platinum')}>
						<FontAwesomeIcon icon={faArrowRight} />
					</Button>
				</ButtonGroup>
				<TextInput type='number' style={{textAlign:'center'}} label='Platinum' value={value.platinum || ''} onChange={(e) => sv('platinum', parseInt(e.target.value))} />
				<ButtonGroup vertical>
					<Button style={transferButtonStyle} variant='outline-secondary' size='sm' onClick={() => handleCurrencyTransfer('electrum', 'platinum')}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</Button>
					<Button style={transferButtonStyle} variant='outline-secondary' size='sm' onClick={() => handleCurrencyTransfer('platinum', 'electrum')}>
						<FontAwesomeIcon icon={faArrowRight} />
					</Button>
				</ButtonGroup>
				<TextInput type='number' style={{textAlign:'center'}} label='Electrum' value={value.electrum || ''} onChange={(e) => sv('electrum', parseInt(e.target.value))} />
			</InputGroup>
		</div>
	);
};

export default MoneySelector;
