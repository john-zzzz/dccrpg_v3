import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Button, Dropdown, ButtonGroup, Form, InputGroup } from 'react-bootstrap';
import bowAndArrow from '../../images/bow-and-arrow.png';
import sword from '../../images/sword.png';

import { faShieldAlt, faPlus, faTrash, faInfoCircle, faWandMagicSparkles, faClover } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { dccReferences } from '../../references/dccReferences';
import { updateCharacter } from '../../slices/dcc/charactersSlice';
import DieSelector from '../Controls/DieSelector';
import CoinSelector from '../Controls/CoinSelector';
import { addDiceRoll, rollDice } from '../../slices/diceSlice';

const Armor = (props) => {
	const { characterId } = props;

	const dispatch = useDispatch();
	const references = dccReferences;
	let character = useSelector((state) => {
		return state.dccCharacters.find((character) => character.id == characterId);
	});

	const handleChange = (propertyPath, value) => {
		dispatch(updateCharacter({ characterId: character.id, propertyPath: propertyPath, value: value }));
	};

	const handleAddArmor = (armor) => {
		let armorLength = Object.keys(character.armor).length - 1;
		handleChange(`armor.${armorLength + 1}`, armor);
	};

	const stripRefs = (object) => {
		if (!object) return;

		let { ref, clone, copy, ...rest } = object;
		return rest;
	};

	const handleDeleteArmor = (armorKey) => {
		let newArmor = JSON.parse(JSON.stringify(character.armor));
		delete newArmor[armorKey];
		handleChange('armor', newArmor);
	};

	const handleDiceRoll = (name, dice, property) => {
		let diceCopy = JSON.parse(JSON.stringify(dice));
		diceCopy.modifier = (dice.modifier && dice.modifier.value) || dice.modifier;

		let rollResult = rollDice(diceCopy, name);
		dispatch(addDiceRoll(rollResult));
		property && handleChange(property, rollResult.total);
	};

	return (
		<>
			<Row className='bt-1 pt-1 align-items-center'>
				<Col lg='1'>
					<b>Armor</b>
				</Col>
				<Col lg='2'>
					<Dropdown>
						<Dropdown.Toggle variant='outline-secondary'>
							<FontAwesomeIcon icon={faPlus} /> Add{' '}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item onClick={() => handleAddArmor({ key: 'other', name: '' })}>
								<b>Other</b>
							</Dropdown.Item>
							{Object.keys(references.armorList).map((armorKey, armorIndex) => {
								let armor = references.armorList[armorKey];
								return (
									<Dropdown.Item key={armorIndex} onClick={() => handleAddArmor(armor)}>
										{armor.name}
									</Dropdown.Item>
								);
							})}
						</Dropdown.Menu>
					</Dropdown>
				</Col>
				<Col lg='2'></Col>
				<Col lg='1'>Armor Class</Col>
				<Col lg='1'>Check</Col>
				<Col lg='1'>Speed</Col>
				<Col lg='3'>Fumble Die</Col>
			</Row>
			{character.armor &&
				Object.keys(stripRefs(character.armor)).map((armorKey, armorIndex) => {
					let armor = character.armor[armorKey];
					return (
						<Row key={armorIndex} className='pb-1 bb-1'>
							<Col>
								<Row className='mt-1'>
									<Col lg='1'>
										<ButtonGroup>
											<Button variant='outline-danger' onClick={() => handleDeleteArmor(armorKey)}>
												<FontAwesomeIcon icon={faTrash} />
											</Button>
											<Button
												variant={armor.equipped ? 'outline-primary' : 'outline-secondary'}
												title='equipped'
												onClick={(e) => handleChange(`armor.${armorKey}.equipped`, !armor.equipped)}>
												<FontAwesomeIcon icon={faShieldAlt} />
											</Button>
										</ButtonGroup>
									</Col>
									<Col lg='4'>
										<InputGroup>
										<Form.Control value={armor.name || ''} onChange={(e) => handleChange(`armor.${armorKey}.name`, e.target.value)} />
										<Button variant='outline-secondary' onClick={(e) => handleChange(`armor.${armorKey}.infoShown`, !armor.infoShown)}>
												<FontAwesomeIcon icon={faInfoCircle} />
											</Button>
										</InputGroup>
									</Col>
									<Col lg='1'>
										<Form.Control
											value={armor.armorClassModifier || 0}
											type='number'
											onChange={(e) => handleChange(`armor.${armorKey}.armorClassModifier`, e.target.value)}
										/>
									</Col>
									<Col lg='1'>
										<Form.Control
											value={armor.checkModifier || 0}
											type='number'
											onChange={(e) => handleChange(`armor.${armorKey}.checkModifier`, e.target.value)}
										/>
									</Col>
									<Col lg='1'>
										<Form.Control
											value={armor.speedModifier || 0}
											type='number'
											onChange={(e) => handleChange(`armor.${armorKey}.speedModifier`, e.target.value)}
										/>
									</Col>
									<Col lg='3'>
										<DieSelector
											value={armor.fumbleDie}
											onChange={(property, value) => handleChange(`armor.${armorKey}.fumbleDie.${property}`, value)}></DieSelector>
									</Col>
								</Row>
								{armor.infoShown && <Row className='mt-1'>
									<Col lg='1'></Col>
									<Col lg='6'>
										<InputGroup>
											<InputGroup.Text>Notes</InputGroup.Text>
											<Form.Control value={armor.notes || ''} onChange={(e) => handleChange(`armor.${armorKey}.notes`, e.target.value)} />
										</InputGroup>
									</Col>
									<Col lg='2'>
										<CoinSelector value={armor.cost} onChange={(property, value) => handleChange(`armor.${armorKey}.cost.${property}`, value)} />
									</Col>
								</Row>}
							</Col>
						</Row>
					);
				})}
		</>
	);
};

export default Armor;
