import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Button, Dropdown, ButtonGroup, Form, InputGroup } from 'react-bootstrap';
import bowAndArrow from '../../images/bow-and-arrow.png';
import sword from '../../images/sword.png';

import { faShieldAlt, faPlus, faTrash, faInfoCircle, faWandMagicSparkles, faClover } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { dccReferences } from '../../references/dccReferences';
import { updateCharacterProperty } from '../../slices/dcc/charactersSlice';
import DieSelector from '../Controls/DieSelector';
import CoinSelector from '../Controls/CoinSelector';
import { addDiceRoll, rollDice } from '../../slices/diceSlice';
import { useState } from 'react';

const Weapons = (props) => {
	const { characterId } = props;

	const dispatch = useDispatch();
	const references = dccReferences;

	let character = useSelector((state) => {
		return state.dccCharacters.find((character) => character.id == characterId);
	});

	character = character && character.character;

	const handleChange = (propertyPath, value) => {
		dispatch(updateCharacterProperty({ characterId: character.id, propertyPath: propertyPath, value: value }));
	};

	const handleAddWeapon = (weapon) => {
		let weaponsLength = character.weapons ? Object.keys(character.weapons).length - 1 : 0;
		handleChange(`weapons.weapon${weaponsLength + 1}`, weapon);
	};

	const handleDeleteWeapon = (weaponKey) => {
		let newWeapons = JSON.parse(JSON.stringify(character.weapons));
		delete newWeapons[weaponKey];
		handleChange('weapons', newWeapons);
	};

	const handleDeleteAmmunition = (weaponKey, ammunitionKey) => {
		let newAmmunition = JSON.parse(JSON.stringify(character.weapons[weaponKey].ammunition));
		delete newAmmunition[ammunitionKey];
		handleChange(`weapons.${weaponKey}.ammunition`, newAmmunition);
	};

	const handleDiceRoll = (name, dice, property) => {
		let diceCopy = JSON.parse(JSON.stringify(dice));
		diceCopy.modifier = (dice.modifier && dice.modifier.value) || dice.modifier;

		let rollResult = rollDice(diceCopy, name);
		dispatch(addDiceRoll(rollResult));
		property && handleChange(property, rollResult.total);
	};

	const handleAttackDiceRoll = (weaponKey, ammunitionKey, rangeKey) => {
		let weapon = JSON.parse(JSON.stringify(character.weapons[weaponKey]));
		let ammunition = weapon.ammunition && weapon.ammunition[ammunitionKey];
		let range = undefined;

		if (ammunition && ammunition.ranges) {
			range = ammunition.ranges[rangeKey];
		} else if (weapon.ranges) {
			range = weapon.ranges[rangeKey];
		}

		let damageDieName = weapon.name || weapon.type;

		let damageModifier = 0;
		let isLucky = character.class.key === 'warrior' && character.class.luckyWeapon === weapon.key;
		if (isLucky) {
			damageModifier += character.luck.currentModifier.value;
		}

		let damageDice = [weapon.damageDie];

		if (range) {
			damageDice = [range.damageDie];
		}

		damageDice[0].modifier = damageDice[0].modifier ? damageDice[0].modifier + damageModifier : damageModifier;

		if (character.class.key === 'warrior') {
			damageDice[0].name = 'Damage Die';
			character.lastDeedDie && damageDice.push({ name: 'Deed Die', ...character.lastDeedDie });
		}

		if (ammunition) {
			damageDieName = `${damageDieName} ${ammunition.name || ammunition.type}`;
			handleChange(`weapons.${weaponKey}.ammunition.${ammunitionKey}.quantity`, ammunition.quantity - 1);
		}

		handleDiceRoll(
			`${damageDieName} Damage`,
			// <>
			// 	{`${damageDieName} Damage`} {isLucky && <FontAwesomeIcon style={{ color: '#198754' }} title='Lucky' icon={faClover} />}
			// </>,
			damageDice
		);
	};

	const handleAddAmmunition = (weaponKey, ammunition) => {
		let characterAmmunition = Object.keys(character.weapons[weaponKey].ammunition);
		let ammunitionLength = characterAmmunition.length;
		handleChange(`weapons.${weaponKey}.ammunition.${ammunitionLength}`, ammunition);
	};
	return (
		<>
			<Row className='bt-1 pb-1 pt-1 align-items-center'>
				<Col lg='1'>
					<b>Weapons</b>
				</Col>
				<Col lg='2'>
					<Dropdown>
						<Dropdown.Toggle variant='outline-secondary'>
							<FontAwesomeIcon icon={faPlus} /> Add{' '}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{Object.keys(references.weapons).map((weaponKey, weaponIndex) => {
								let weapon = references.weapons[weaponKey];
								return (
									<Dropdown.Item key={weaponIndex} onClick={() => handleAddWeapon(weapon)}>
										{weapon.type}
									</Dropdown.Item>
								);
							})}
						</Dropdown.Menu>
					</Dropdown>
				</Col>
				{Object.keys(character.weapons).length > 0 && (
					<>
						<Col lg='2'></Col>
						<Col lg='1'>Qty</Col>
						<Col lg='3'>Damage</Col>
						<Col lg='3'>Attack</Col>
					</>
				)}
			</Row>
			{character.weapons &&
				Object.keys(character.weapons).map((weaponKey, weaponIndex) => {
					let weapon = character.weapons[weaponKey];
					return (
						<Row key={weaponIndex} className='pb-1 bb-1'>
							<Col>
								<Row className='mt-1'>
									<Col lg='1'>
										<ButtonGroup>
											<Button variant='outline-danger' onClick={() => handleDeleteWeapon(weaponKey)}>
												<FontAwesomeIcon icon={faTrash} />
											</Button>
											<Button
												variant={weapon.equipped ? 'outline-primary' : 'outline-secondary'}
												title='equipped'
												onClick={(e) => handleChange(`weapons.${weaponKey}.equipped`, !weapon.equipped)}>
												<FontAwesomeIcon icon={faShieldAlt} />
											</Button>
										</ButtonGroup>
									</Col>
									<Col lg='4'>
										<InputGroup>
											<Form.Control value={weapon.name || weapon.type} onChange={(e) => handleChange(`weapons.${weaponKey}.name`, e.target.value)} />
											{character.class.key === 'warrior' && (
												<InputGroup.Text title='Lucky' style={weapon.key === character.class.luckyWeapon ? { color: '#198754' } : {}}>
													<FontAwesomeIcon icon={faClover} />
												</InputGroup.Text>
											)}
											{!weapon.requiresAmmunition && (
												<Button variant='outline-secondary' title='Silvered' onClick={() => handleChange(`weapons.${weaponKey}.silvered`, !weapon.silvered)}>
													<span
														style={
															weapon.silvered
																? {
																		fontSize: '12px',
																		backgroundColor: '#a3cfbb',
																		color: 'black',
																		borderRadius: '4px',
																		padding: '0px'
																  }
																: { fontSize: '12px', borderRadius: '4px', padding: '0px' }
														}>
														Ag
													</span>
												</Button>
											)}
											<Button
												variant='outline-secondary'
												title='Magical'
												style={weapon.magical ? { color: '#198754' } : {}}
												onClick={() => handleChange(`weapons.${weaponKey}.magical`, !weapon.magical)}>
												<FontAwesomeIcon icon={faWandMagicSparkles} />
											</Button>
											<Button variant='outline-secondary' onClick={(e) => handleChange(`weapons.${weaponKey}.infoShown`, !weapon.infoShown)}>
												<FontAwesomeIcon icon={faInfoCircle} />
											</Button>
										</InputGroup>
									</Col>
									<Col lg='1'>
										{weapon.requiresAmmunition && (
											<Dropdown>
												<Dropdown.Toggle className='w-100' variant='outline-secondary'>
													<img src={bowAndArrow} style={{ width: '18px' }} />
												</Dropdown.Toggle>
												<Dropdown.Menu>
													{Object.keys(references.weapons[weapon.key].ammunition).map((ammunitionKey, ammunitionIndex) => {
														let ammunition = references.weapons[weapon.key].ammunition[ammunitionKey];
														return (
															<Dropdown.Item key={ammunitionIndex} onClick={() => handleAddAmmunition(weaponKey, ammunition)}>
																{ammunition.type}
															</Dropdown.Item>
														);
													})}
												</Dropdown.Menu>
											</Dropdown>
										)}
									</Col>
									<Col lg='3'>
										{!weapon.requiresAmmunition && (
											<DieSelector
												value={weapon.damageDie}
												onChange={(property, value) => handleChange(`weapons.${weaponKey}.damageDie.${property}`, value)}></DieSelector>
										)}
									</Col>
									<Col lg='3'>
										{!weapon.requiresAmmunition && (
											<ButtonGroup className='w-100'>
												{weapon.ranges ? (
													Object.keys(weapon.ranges).map((rangeKey, rangeIndex) => {
														return (
															<Button key={rangeIndex} variant='outline-secondary' onClick={() => handleAttackDiceRoll(weaponKey, undefined, rangeKey)}>
																<img src={sword} width='20px' /> {weapon.ranges[rangeKey].range}ft
															</Button>
														);
													})
												) : (
													<Button variant='outline-secondary' onClick={() => handleAttackDiceRoll(weaponKey)}>
														<img src={sword} width='20px' />
													</Button>
												)}
											</ButtonGroup>
										)}
									</Col>
								</Row>
								{weapon.infoShown && (
									<>
										<Row className='mt-1'>
											<Col lg='1'></Col>
											<Col lg='6'>
												<InputGroup>
													<InputGroup.Text>Notes</InputGroup.Text>
													<Form.Control value={weapon.notes || ''} onChange={(e) => handleChange(`weapons.${weaponKey}.notes`, e.target.value)} />
												</InputGroup>
											</Col>
											{weapon.ranges && (
												<Col lg='3'>
													<InputGroup>
														<InputGroup.Text>Ranges</InputGroup.Text>
														<Form.Control
															type='number'
															title='Short'
															value={weapon.ranges.short.range}
															onChange={(e) => handleChange(`weapons.${weaponKey}.ranges.short.range`, e.target.value)}
														/>
														<Form.Control
															type='number'
															title='Medium'
															value={weapon.ranges.medium.range}
															onChange={(e) => handleChange(`weapons.${weaponKey}.ranges.medium.range`, e.target.value)}
														/>
														<Form.Control
															type='number'
															title='Long'
															value={weapon.ranges.long.range}
															onChange={(e) => handleChange(`weapons.${weaponKey}.ranges.long.range`, e.target.value)}
														/>
													</InputGroup>
												</Col>
											)}
											<Col lg='2'>
												<CoinSelector value={weapon.cost} onChange={(property, value) => handleChange(`weapons.${weaponKey}.cost.${property}`, value)} />
											</Col>
										</Row>
										{weapon.footNotes && (
											<Row>
												<Col lg='1'></Col>
												<Col>
													<i>{weapon.footNotes}</i>
												</Col>
											</Row>
										)}
									</>
								)}
								{weapon.requiresAmmunition &&
									Object.keys(weapon.ammunition).map((ammunitionKey, ammunitionIndex) => {
										let ammunition = weapon.ammunition[ammunitionKey];
										return (
											<div key={ammunitionIndex}>
												<Row className='mt-1'>
													<Col lg='1'>
														<ButtonGroup>
															<Button variant='outline-danger' onClick={() => handleDeleteAmmunition(weaponKey, ammunitionKey)}>
																<FontAwesomeIcon icon={faTrash} />
															</Button>
														</ButtonGroup>
													</Col>
													<Col lg='4'>
														<InputGroup>
															<Form.Control
																value={ammunition.type}
																onChange={(e) => handleChange(`weapons.${weaponKey}.ammunition.${ammunitionKey}.type`, e.target.value)}
															/>
															<Button
																variant='outline-secondary'
																title='Silvered'
																style={ammunition.silvered ? { color: '#198754' } : {}}
																onClick={() => handleChange(`weapons.${weaponKey}.ammunition.${ammunitionKey}.silvered`, !ammunition.silvered)}>
																<span
																	style={
																		ammunition.silvered
																			? {
																					fontSize: '12px',
																					backgroundColor: '#a3cfbb',
																					color: 'black',
																					borderRadius: '4px',
																					padding: '2px'
																			  }
																			: { fontSize: '12px', borderRadius: '4px', padding: '2px' }
																	}>
																	Ag
																</span>
															</Button>
															<Button
																variant='outline-secondary'
																title='Magical'
																style={ammunition.magical ? { color: '#198754' } : {}}
																onClick={() => handleChange(`weapons.${weaponKey}.ammunition.${ammunitionKey}.magical`, !ammunition.magical)}>
																<FontAwesomeIcon icon={faWandMagicSparkles} />
															</Button>
															<Button
																variant='outline-secondary'
																onClick={() => handleChange(`weapons.${weaponKey}.ammunition.${ammunitionKey}.infoShown`, !ammunition.infoShown)}>
																<FontAwesomeIcon icon={faInfoCircle} />
															</Button>
														</InputGroup>
													</Col>
													<Col lg='1'>
														<Form.Control
															value={ammunition.quantity || 0}
															title='Quantity'
															type='number'
															onChange={(e) => handleChange(`weapons.${weaponKey}.ammunition.${ammunitionKey}.quantity`, e.target.value)}
														/>
													</Col>
													<Col lg='3'>
														<DieSelector
															value={ammunition.damageDie}
															onChange={(property, value) => handleChange(`weapons.${weaponKey}.ammunition.${ammunitionKey}.damageDie.${property}`, value)}
														/>
													</Col>
													<Col lg='3'>
														<ButtonGroup className='w-100'>
															{ammunition.ranges ? (
																Object.keys(ammunition.ranges).map((rangeKey, rangeIndex) => {
																	return (
																		<Button
																			key={rangeIndex}
																			variant='outline-secondary'
																			onClick={() => handleAttackDiceRoll(weaponKey, ammunitionKey, rangeKey)}
																			// onClick={() =>
																			// 	handleDiceRoll(`${weapon.name || weapon.type} ${ammunition.name || ammunition.type} Damage`, {
																			// 		number: ammunition.damageDie.number,
																			// 		// TODO: How do we go "one down" on the dice chain?
																			// 		die: rangeKey === 'long' ? ammunition.damageDie.die : ammunition.damageDie.die,
																			// 		modifier: rangeKey === 'medium' ? (ammunition.damageDie.modifier || 0) - 2 : ammunition.damageDie.modifier
																			// 	})
																			// }
																		>
																			<img src={sword} width='20px' /> {ammunition.ranges[rangeKey].range}ft
																		</Button>
																	);
																})
															) : (
																<Button variant='outline-secondary' onClick={() => handleAttackDiceRoll(weapon, ammunition)}>
																	<img src={sword} width='20px' />
																</Button>
															)}
														</ButtonGroup>
													</Col>
												</Row>
												{ammunition.infoShown && (
													<>
														<Row className='mt-1'>
															<Col lg='1'></Col>
															<Col lg='9'>
																<InputGroup>
																	<InputGroup.Text>Notes</InputGroup.Text>
																	<Form.Control
																		value={ammunition.notes || ''}
																		onChange={(e) => handleChange(`weapons.${weaponKey}.ammunition.${ammunitionKey}.notes`, e.target.value)}
																	/>
																</InputGroup>
															</Col>
															<Col lg='2'>
																<CoinSelector
																	value={ammunition.cost || ''}
																	onChange={(property, value) => handleChange(`weapons.${weaponKey}.ammunition.${ammunitionKey}.cost.${property}`, value)}
																/>
															</Col>
														</Row>
														{weapon.footNotes && (
															<Row>
																<Col lg='1'></Col>
																<Col>
																	<i>{ammunition.footNotes}</i>
																</Col>
															</Row>
														)}
													</>
												)}
											</div>
										);
									})}
							</Col>
						</Row>
					);
				})}
		</>
	);
};

export default Weapons;
