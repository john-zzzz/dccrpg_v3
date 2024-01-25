import { Button, Col, InputGroup, Row, Container, Form, FloatingLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextInput from '../Controls/TextInput';
import { updateCharacter } from '../../slices/dcc/charactersSlice';
import SelectInput from '../Controls/SelectInput';
import { dccReferences } from '../../references/dccReferences';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusMinus, faShieldAlt, faArrowDownWideShort, faDiceD20, faHeartPulse, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import DieSelector from '../Controls/DieSelector';
import { useState } from 'react';
import { addDiceRoll, dice, formatDieResult, rollDice } from '../../slices/diceSlice';
import { birthAugers } from '../../references/dcc/birthAugers';
import Weapons from './Weapons';
import Equipment from './Equipment';
import Beasts from './Beasts';
import { WarriorCore } from './Warrior';
import Armor from './Armor';

const CharacterAttribute = (props) => {
	let { name, attribute, onChange, onRollDice } = props;

	const handleChange = (propertyName, value) => {
		onChange && onChange(propertyName, value);
	};

	const handleDiceRoll = (name, die) => {
		onRollDice && onRollDice(name, die);
	};

	return (
		<InputGroup>
			<FloatingLabel label={<b>{name}</b>}>
				<Form.Control
					type='number'
					style={{ fontWeight: 'bold', textAlign: 'center' }}
					value={attribute.base}
					onChange={(e) => handleChange('base', parseInt(e.target.value))}
				/>
			</FloatingLabel>
			<FloatingLabel label='Temp +/-'>
				<Form.Control
					type='number'
					value={attribute.tempModifier}
					style={{ textAlign: 'center' }}
					onChange={(e) => handleChange('tempModifier', parseInt(e.target.value))}
				/>
			</FloatingLabel>
			<FloatingLabel label='Modifier'>
				<Form.Control
					disabled={true}
					type='number'
					value={attribute.modifier.value}
					style={{ textAlign: 'center' }}
					onChange={(e) => handleChange('modifier.value', e.target.value)}
				/>
			</FloatingLabel>
			<Button
				style={{ minWidth: '80px' }}
				variant='outline-secondary'
				onClick={() => handleDiceRoll(name, { number: 1, die: dice.d20, modifier: attribute.currentModifier.value || 0 })}>
				<FontAwesomeIcon icon={faDiceD20} /> {attribute.currentModifier.value > -1 && '+'}
				{attribute.currentModifier.value}
			</Button>
		</InputGroup>
	);
};

const CharacterCore = () => {
	const params = useParams();

	let characterId = params.characterId;

	const dispatch = useDispatch();
	const references = dccReferences;
	let character = useSelector((state) => {
		return state.dccCharacters.find((character) => character.id == characterId);
	});

	const [hitPointChange, setHitPointChange] = useState();

	const handleHitPointsChange = (operator) => {
		if (hitPointChange === undefined) return;
		let newHitPoints = character.hitPoints.current.value;
		if (operator === '+') {
			newHitPoints += parseInt(hitPointChange);
		}
		if (operator === '-') {
			newHitPoints -= parseInt(hitPointChange);
		}

		if (newHitPoints < 0) newHitPoints = 0;
		if (newHitPoints > character.hitPoints.max.value) newHitPoints = character.hitPoints.max.value;

		handleChange('hitPoints.current.value', newHitPoints);
		setHitPointChange();
	};

	const handleChange = (propertyPath, value) => {
		dispatch(updateCharacter({ characterId: character.id, propertyPath: propertyPath, value: value }));
	};

	const handleDiceRoll = (name, dice, property) => {
		let diceCopy = JSON.parse(JSON.stringify(dice));
		diceCopy.modifier = (dice.modifier && dice.modifier.value) || dice.modifier;

		let rollResult = rollDice(diceCopy, name);
		dispatch(addDiceRoll(rollResult));
		property && handleChange(property, rollResult.total);
	};

	const handleActionDiceRoll = (name, dice, property) => {
		let diceCopy = JSON.parse(JSON.stringify(dice));
		diceCopy.modifier = (dice.modifier && dice.modifier.value) || dice.modifier;

		let rollResult = rollDice(diceCopy, name);
		handleChange('lastDeedDie', rollResult.dice[1]);
		dispatch(addDiceRoll(rollResult));
		property && handleChange(property, rollResult.total);
	};

	const stripRefs = (object) => {
		let { ref, clone, ...rest } = object;
		return rest;
	};

	if (!character) {
		return <div></div>;
	}

	return (
		<Container fluid>
			<Row className='mt-2'>
				<Col xs='12' lg='3'>
					<Row className='pb-2'>
						<Col xs='6'>
							<div className='w-100' style={{ border: '1px solid black', height: '110px', borderRadius: '4px' }}>
								<div style={{ paddingLeft: '4px', borderBottom: '1px solid black' }}>
									<FontAwesomeIcon icon={faShieldAlt} /> Armor Class
								</div>
								<div>
									<input
										value={character.armorClass.current.value}
										onChange={(e) => handleChange('armorClass.current.value', e.target.value)}
										type='number'
										style={{
											textAlign: 'center',
											fontSize: '40px',
											width: '100%',
											height: '51px',
											border: '0px',
											padding: '0px',
											margin: '0px',
											marginBottom: '-4px'
										}}
									/>
								</div>
								<div>
									<div
										// TODO: Hover styles
										style={{
											borderTop: '1px solid black',
											height: '29px',
											textAlign: 'center',
											marginTop: '4px'
										}}>
										Base: {character.armorClass.base.value}
									</div>
								</div>
							</div>
						</Col>

						<Col xs='6'>
							<div className='w-100' style={{ border: '1px solid black', height: '110px', borderRadius: '4px' }}>
								<div style={{ paddingLeft: '4px', borderBottom: '1px solid black' }}>
									<FontAwesomeIcon icon={faArrowDownWideShort} /> Inititive
								</div>
								<div>
									<input
										value={character.inititive.current || ''}
										type='number'
										onChange={(e) => handleChange('inititive.current', e.target.value)}
										style={{
											width: '100%',
											textAlign: 'center',
											fontSize: '40px',
											height: '51px',
											border: '0px',
											padding: '0px',
											margin: '0px',
											marginBottom: '-4px'
										}}
									/>
								</div>
								<div>
									<div
										// TODO: Hover styles
										style={{
											borderTop: '1px solid black',
											height: '29px',
											cursor: 'pointer',
											textAlign: 'center',
											marginTop: '4px'
										}}
										onClick={() => handleDiceRoll('Inititive', character.inititive.dice, 'inititive.current')}>
										{formatDieResult(character.inititive.dice)} <FontAwesomeIcon icon={faDiceD20} />
									</div>
								</div>
							</div>
						</Col>
					</Row>
					<Row className='pb-2'>
						<Col xs='12'>
							<div className='w-100' style={{ backgroundColor: 'white', border: '1px solid black', height: '110px', borderRadius: '4px' }}>
								<div style={{ paddingLeft: '4px', borderBottom: '1px solid black' }}>
									<FontAwesomeIcon icon={faHeartPulse} /> Hit Points
								</div>
								<Row>
									<Col xs='5'>
										<input
											value={character.hitPoints.current.value || 0}
											type='number'
											onChange={(e) => handleChange('hitPoints.current.value', e.target.value)}
											style={{
												width: '100%',
												textAlign: 'center',
												fontSize: '40px',
												height: '51px',
												border: '0px',
												padding: '0px',
												margin: '0px',
												marginBottom: '-4px'
											}}
										/>
									</Col>
									<Col className='pt-2 pe-3' xs='7'>
										<InputGroup>
											<Form.Control
												value={hitPointChange || ''}
												onChange={(e) => {
													setHitPointChange(e.target.value);
												}}
											/>
											<Button variant='outline-danger' onClick={() => handleHitPointsChange('-')}>
												<FontAwesomeIcon icon={faMinus} />
											</Button>
											<Button variant='outline-success' onClick={() => handleHitPointsChange('+')}>
												<FontAwesomeIcon icon={faPlus} />
											</Button>
										</InputGroup>
									</Col>
								</Row>
								<div
									style={{
										borderTop: '1px solid black',
										height: '29px',
										marginTop: '4px'
									}}>
									<Row>
										<Col xs='2' className='m-1'>
											Max
										</Col>
										<Col xs='3'>
											<input
												style={{
													textAlign: 'center',
													border: '0px',
													borderBottom: '1px solid black',
													margin: '0px',
													padding: '0px',
													width: '100%'
												}}
												value={character.hitPoints.max.value || 0}
												onChange={(e) => handleChange('hitPoints.max.value', e.target.value)}
											/>
										</Col>
									</Row>
								</div>
							</div>
						</Col>
					</Row>
					<Row>
						<Col xs='12'>
							<div className='form-control'>
								<label style={{ transform: 'scale(.85)' }}>Action Dice</label>
								<br />
								<Row>
									{Object.keys(stripRefs(character.class.actionDice)).map((actionDie, actionDieIndex) => {
										return (
											<Col lg='6' key={actionDieIndex} className='mt-1'>
												<Button
													size='sm'
													variant='outline-secondary'
													key={actionDieIndex}
													className='w-100'
													onClick={() => {
														let actionDice = [{ name: 'Action Die', ...character.class.actionDice[actionDie] }];
														if (character.class.deedDie) {
															actionDice[0].name = 'Action Die';
															actionDice.push({ name: 'Deed Die', ...character.class.deedDie });
														}
														handleActionDiceRoll(`Action Die ${actionDieIndex + 1}`, actionDice);
													}}>
													<FontAwesomeIcon icon={faDiceD20} />
													{character.class.actionDice[actionDie].number}d{character.class.actionDice[actionDie].die}
													{character.class.actionDice[actionDie].modifier && `+${character.class.actionDice[actionDie].modifier}`}
												</Button>
											</Col>
										);
									})}
								</Row>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>{character.class.key === 'warrior' && <WarriorCore character={character} onRollDice={handleDiceRoll} onChange={handleChange} />}</Col>
					</Row>
				</Col>
				<Col lg='9'>
					<Row className='pb-2'>
						<Col lg='6'>
							<CharacterAttribute
								name='Strength'
								attribute={character.strength}
								onChange={(property, value) => handleChange(`strength.${property}`, value)}
								onRollDice={(name, dice) => handleDiceRoll(name, dice)}
							/>
						</Col>
						<Col lg='2'>
							<TextInput
								label='Check Modifier'
								className='text-center'
								value={character.checkModifier.value}
								onChange={(e) => handleChange('checkModifier.value', e.target.value)}
							/>
						</Col>
						<Col lg='2'>
							{character.class.key !== 'warrior' && (
								<TextInput
									label='Melee Attack'
									className='text-center'
									value={character.meleeAttackModifier.value}
									onChange={(e) => handleChange('meleeAttackModifier.value', e.target.value)}
								/>
							)}
						</Col>
						<Col lg='2'>
							{character.class.key !== 'warrior' && (
								<TextInput
									label='Melee Damage'
									className='text-center'
									value={character.meleeDamageModifier.value}
									onChange={(e) => handleChange('meleeDamageModifier.value', e.target.value)}
								/>
							)}
						</Col>
					</Row>
					<Row className='pb-2'>
						<Col lg='6'>
							<CharacterAttribute
								name='Agility'
								attribute={character.agility}
								onChange={(property, value) => handleChange(`agility.${property}`, value)}
								onRollDice={(name, dice) => handleDiceRoll(name, dice)}
							/>
						</Col>
						<Col lg='2'>
							<TextInput
								label='Reflex Save'
								className='text-center'
								value={character.reflexModifier.value}
								onChange={(e) => handleChange('reflexModifier.value', e.target.value)}
							/>
						</Col>
						<Col lg='2'>
							{character.class.key !== 'warrior' && (
								<TextInput
									label='Missile Attack'
									className='text-center'
									value={character.missileAttackModifier.value}
									onChange={(e) => handleChange('missileAttackModifier.value', e.target.value)}
								/>
							)}
						</Col>
						<Col lg='2'>
							{character.class.key !== 'warrior' && (
								<TextInput
									label='Missile Damage'
									className='text-center'
									value={character.missileDamageModifier.value}
									onChange={(e) => handleChange('missileDamageModifier.value', e.target.value)}
								/>
							)}
						</Col>
					</Row>
					<Row className='pb-2'>
						<Col lg='6'>
							<CharacterAttribute
								name='Stamina'
								attribute={character.stamina}
								onChange={(property, value) => handleChange(`stamina.${property}`, value)}
								onRollDice={(name, dice) => handleDiceRoll(name, dice)}
							/>
						</Col>
						<Col lg='2'>
							<TextInput
								label='Fortitude Save'
								className='text-center'
								value={character.fortitudeModifier.value}
								onChange={(e) => handleChange('fortitudeModifier.value', e.target.value)}
							/>
						</Col>
					</Row>
					<Row className='pb-2'>
						<Col lg='6'>
							<CharacterAttribute
								name='Personality'
								attribute={character.personality}
								onChange={(property, value) => handleChange(`personality.${property}`, value)}
								onRollDice={(name, dice) => handleDiceRoll(name, dice)}
							/>
						</Col>
						<Col lg='2'>
							<TextInput
								label='Willpower Save'
								className='text-center'
								value={character.willpowerModifier.value}
								onChange={(e) => handleChange('willpowerModifier.value', e.target.value)}
							/>
						</Col>
					</Row>
					<Row className='pb-2'>
						<Col lg='6'>
							<CharacterAttribute
								name='Luck'
								attribute={character.luck}
								onChange={(property, value) => handleChange(`luck.${property}`, value)}
								onRollDice={(name, dice) => handleDiceRoll(name, dice)}
							/>
						</Col>

						<Col lg='6'>
							<SelectInput
								label='Birth Auger'
								value={character.birthAuger ? character.birthAuger.number : ''}
								onChange={(value) => handleChange('birthAuger.value', value)}
								options={Object.keys(references.birthAugers).map((birthAuger) => {
									return {
										value: references.birthAugers[birthAuger].number,
										label: `${references.birthAugers[birthAuger].number}-${references.birthAugers[birthAuger].auger}`
									};
								})}
							/>
						</Col>
					</Row>
					<Row className='pb-2'>
						<Col lg='6'>
							<CharacterAttribute
								name='Intelligence'
								attribute={character.intelligence}
								onChange={(property, value) => handleChange(`intelligence.${property}`, value)}
								onRollDice={(name, dice) => handleDiceRoll(name, dice)}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
			<Weapons characterId={characterId} />
			<Armor characterId={characterId} />
			<Equipment characterId={characterId} />
			<Beasts characterId={characterId} />
			{/* <pre>
				<code>{JSON.stringify(character.hitPoints.current.value, null, 2)}</code>
			</pre> */}
			<pre>
				<code>
					TODO: <br />
					Birth Auger stat affects <br />
					Beasts inheriting HP from character (because of the ref to the top level object...) <br />
					Save to localstorage Death <br />
					Leveling up <br />
					Money <br />
					Fumbles & Crits on rolls
					<br />
				</code>
			</pre>
		</Container>
	);
};

export default CharacterCore;
