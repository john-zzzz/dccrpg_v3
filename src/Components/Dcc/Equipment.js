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
import { useState } from 'react';

const Equipment = (props) => {
	const { characterId } = props;

	const dispatch = useDispatch();
	const references = dccReferences;
	let character = useSelector((state) => {
		return state.dccCharacters.find((character) => character.id == characterId);
	});

	const handleChange = (propertyPath, value) => {
		dispatch(updateCharacter({ characterId: character.id, propertyPath: propertyPath, value: value }));
	};

	const handleAddEquipment = (equipment) => {
		let equipmentLength = Object.keys(character.equipment).length - 1;
		handleChange(`equipment.${equipmentLength + 1}`, equipment);
	};

	const stripRefs = (object) => {
		let { ref, clone, ...rest } = object;
		return rest;
	};

	const handleDeleteEquipment = (equipmentKey) => {
		let newEquipments = JSON.parse(JSON.stringify(character.equipment));
		delete newEquipments[equipmentKey];
		handleChange('equipment', newEquipments);
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
					<b>Equipment</b>
				</Col>
				<Col lg='2'>
					<Dropdown>
						<Dropdown.Toggle variant='outline-secondary'>
							<FontAwesomeIcon icon={faPlus} /> Add{' '}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item onClick={() => handleAddEquipment({ key: 'other', name: '' })}>
								<b>Other</b>
							</Dropdown.Item>
							{Object.keys(references.equipment).map((equipmentKey, equipmentIndex) => {
								let equipment = references.equipment[equipmentKey];
								return (
									<Dropdown.Item key={equipmentIndex} onClick={() => handleAddEquipment(equipment)}>
										{equipment.name}
									</Dropdown.Item>
								);
							})}
						</Dropdown.Menu>
					</Dropdown>
				</Col>
				<Col lg='2'></Col>
				<Col lg='1'>Qty</Col>
				<Col lg='2'>Cost</Col>
				<Col lg='4'>Notes</Col>
			</Row>
			{character.equipment && Object.keys(stripRefs(character.equipment)).map((equipmentKey, equipmentIndex) => {
				let equipment = character.equipment[equipmentKey];
				return (
					<Row key={equipmentIndex} className='pb-1 bb-1'>
						<Col>
							<Row className='mt-1'>
								<Col lg='1'>
									<ButtonGroup>
										<Button variant='outline-danger' onClick={() => handleDeleteEquipment(equipmentKey)}>
											<FontAwesomeIcon icon={faTrash} />
										</Button>
										{/* <Button
											variant={equipment.equipped ? 'outline-primary' : 'outline-secondary'}
											title='equipped'
											onClick={(e) => handleChange(`equipment.${equipmentKey}.equipped`, !equipment.equipped)}>
											<FontAwesomeIcon icon={faShieldAlt} />
										</Button> */}
									</ButtonGroup>
								</Col>
								<Col lg='4'>
									<Form.Control value={equipment.name || ''} onChange={(e) => handleChange(`equipment.${equipmentKey}.name`, e.target.value)} />
								</Col>
								<Col lg='1'>
									<Form.Control
										value={equipment.quantity || 1}
										type='number'
										onChange={(e) => handleChange(`equipment.${equipmentKey}.quantity`, e.target.value)}
									/>
								</Col>
								<Col lg='2'>
									<CoinSelector
										value={equipment.cost}
										onChange={(propertyPath, value) => handleChange(`equipment.${equipmentKey}.cost.${propertyPath}`, value)}
									/>
								</Col>
                                <Col lg='4'>
                                <Form.Control
										value={equipment.quantity || ''}
										onChange={(e) => handleChange(`equipment.${equipmentKey}.notes`, e.target.value)}
									/>
								</Col>
							</Row>
						</Col>
					</Row>
				);
			})}
		</>
	);
};

export default Equipment;
