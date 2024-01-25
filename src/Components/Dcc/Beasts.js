import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Button, Dropdown, ButtonGroup, Form, InputGroup } from 'react-bootstrap';
import sword from '../../images/sword.png';

import { faShieldAlt, faPlus, faTrash, faInfoCircle, faWandMagicSparkles, faClover, faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { dccReferences } from '../../references/dccReferences';
import { updateCharacter } from '../../slices/dcc/charactersSlice';
import DieSelector from '../Controls/DieSelector';
import CoinSelector from '../Controls/CoinSelector';
import { addDiceRoll, dice, formatDieResult, rollDice } from '../../slices/diceSlice';
import SelectInput from '../Controls/SelectInput';

const Beasts = (props) => {
	const { characterId } = props;

	const dispatch = useDispatch();
	const references = dccReferences;
	let character = useSelector((state) => {
		return state.dccCharacters.find((character) => character.id == characterId);
	});

	const handleChange = (propertyPath, value) => {
		dispatch(updateCharacter({ characterId: character.id, propertyPath: propertyPath, value: value }));
	};

	const handleAddBeast = (beast) => {
		let beastLength = Object.keys(character.beasts).length - 1;
		handleChange(`beasts.${beastLength + 1}`, beast);
	};

	const stripRefs = (object) => {
		let { ref, clone, ...rest } = object;
		return rest;
	};

	const handleDeleteBeast = (beastKey) => {
		let newBeasts = JSON.parse(JSON.stringify(character.beasts));
		delete newBeasts[beastKey];
		handleChange('beasts', newBeasts);
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
					<b>Beasts</b>
				</Col>
				<Col lg='4'>
					<Dropdown>
						<Dropdown.Toggle variant='outline-secondary'>
							<FontAwesomeIcon icon={faPlus} /> Add{' '}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Item onClick={() => handleAddBeast({ key: 'other', name: '' })}>
								<b>Other</b>
							</Dropdown.Item>
							{Object.keys(references.beasts).map((beastKey, beastIndex) => {
								let beast = references.beasts[beastKey];
								return (
									<Dropdown.Item key={beastIndex} onClick={() => handleAddBeast(beast)}>
										{beast.type}
									</Dropdown.Item>
								);
							})}
						</Dropdown.Menu>
					</Dropdown>
				</Col>
				<Col lg='2'>Hit Points</Col>
				<Col lg='1'>AC</Col>
				<Col lg='2'>Inititive</Col>
				<Col lg='2'>Action Dice</Col>
			</Row>


			{stripRefs(character.beasts) &&
				Object.keys(stripRefs(character.beasts)).map((beastKey, beastIndex) => {
					let beast = character.beasts[beastKey];
					return (
						<Row key={beastIndex} className='pb-1 bb-1'>
							<Col>
								<Row className='mt-1'>
									<Col lg='1'>
										<ButtonGroup>
											<Button variant='outline-danger' onClick={() => handleDeleteBeast(beastKey)}>
												<FontAwesomeIcon icon={faTrash} />
											</Button>
										</ButtonGroup>
									</Col>
									<Col lg='4'>
										<Form.Control value={beast.name || beast.type || ''} onChange={(e) => handleChange(`beasts.${beastKey}.name`, e.target.value)} />
									</Col>
									<Col lg='2'>
										<InputGroup>
											<Form.Control
												title='Current'
												value={beast.hitPoints.current.value || ''}
												onChange={(e) => handleChange(`beasts.${beastKey}.hitPoints.current.value`, e.target.value)}
											/>
											<InputGroup.Text>/</InputGroup.Text>
											<Form.Control
												title='Max'
												value={beast.hitPoints.max || ''}
												onChange={(e) => handleChange(`beasts.${beastKey}.hitPoints.max`, e.target.value)}
											/>
										</InputGroup>
									</Col>
									<Col lg='1'>
										<Form.Control
											title='Armor Class'
											value={beast.armorClass || ''}
											onChange={(e) => handleChange(`beasts.${beastKey}.armorClass`, e.target.value)}
										/>
									</Col>
									<Col lg='2'>
										<InputGroup>
											<Form.Control value={beast.inititive || ''} onChange={(e) => handleChange(`beasts.${beastKey}.inititive`, e.target.value)} />
											<Button
												variant='outline-secondary'
												onClick={() =>
													handleDiceRoll(
														`${beast.name || beast.type} Inititive`,
														{ number: 1, die: dice.d20, modifier: beast.inititiveModifier || 0 },
														`beasts.${beastKey}.inititive`
													)
												}>
												<FontAwesomeIcon icon={faDiceD20} />
												{formatDieResult({ number: 1, die: dice.d20, modifier: beast.inititiveModifier || 0 })}
											</Button>
										</InputGroup>
									</Col>
									<Col lg='2'>
										<Button
											className='w-100'
											variant='outline-secondary'
											onClick={() => handleDiceRoll(`${beast.name || beast.type} Action Die`, beast.actionDie, `beasts.${beastKey}.actionDie.number`)}>
											<FontAwesomeIcon icon={faDiceD20} />
											{formatDieResult(beast.actionDie)}
										</Button>
									</Col>
								</Row>
								<Row className='mt-1'>
									<Col lg='1'></Col>
									<Col lg='4'>
										<InputGroup>
											<Button variant='outline-secondary'>
												<FontAwesomeIcon
													icon={faDiceD20}
													onClick={() =>
														handleDiceRoll(`${beast.name || beast.type} Reflex Save`, { number: 1, die: dice.d20, modifier: beast.reflexModifier || 0 })
													}
												/>
												R
											</Button>
											<Form.Control value={beast.reflexModifier || ''} onChange={(e) => handleChange(`beasts.${beastKey}.reflexModifier`, e.target.value)} />
											<Button variant='outline-secondary'>
												<FontAwesomeIcon
													icon={faDiceD20}
													onClick={() =>
														handleDiceRoll(`${beast.name || beast.type} Fortitude Save`, { number: 1, die: dice.d20, modifier: beast.fortitudeModifier || 0 })
													}
												/>
												F
											</Button>
											<Form.Control
												value={beast.fortitudeModifier || ''}
												onChange={(e) => handleChange(`beasts.${beastKey}.fortitudeModifier`, e.target.value)}
											/>
											<Button variant='outline-secondary'>
												<FontAwesomeIcon
													icon={faDiceD20}
													onClick={() =>
														handleDiceRoll(`${beast.name || beast.type} Willpower Save`, { number: 1, die: dice.d20, modifier: beast.willpowerModifier || 0 })
													}
												/>
												W
											</Button>
											<Form.Control
												value={beast.willpowerModifier || ''}
												onChange={(e) => handleChange(`beasts.${beastKey}.willpowerModifier`, e.target.value)}
											/>
										</InputGroup>
									</Col>
									<Col lg='2'>
										<SelectInput
											value={beast.alignment.key}
											options={Object.keys(references.alignments).map((alignment) => {
												return { label: references.alignments[alignment].name, value: alignment };
											})}
											onChange={(value) => handleChange(`beasts.${beastKey}.alignment.key`, value)}
										/>
									</Col>
									<Col lg='2'>
										<CoinSelector value={beast.cost} onChange={(propertyPath, value) => handleChange(`beasts.${beastKey}.cost.${propertyPath}`, value)} />
									</Col>
									{beast.attacks &&
										Object.keys(beast.attacks).map((attackKey, attackIndex) => {
											let attack = beast.attacks[attackKey];
											return (
												<Col key={attackIndex} lg='2'>
													<InputGroup>
														<InputGroup.Text>{attack.name}</InputGroup.Text>
														<Button variant='outline-secondary'>
															<FontAwesomeIcon
																icon={faDiceD20}
																onClick={() =>
																	handleDiceRoll(`${beast.name || beast.type} ${attack.name} Damage`, {
																		number: attack.damage.number,
																		die: attack.damage.die,
																		modifier: attack.damage.modifier || 0
																	})
																}
															/>
															{formatDieResult(attack.damage)}
														</Button>
													</InputGroup>
												</Col>
											);
										})}
								</Row>
							</Col>
						</Row>
					);
				})}
		</>
	);
};

export default Beasts;
