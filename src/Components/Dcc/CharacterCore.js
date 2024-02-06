import { Button, Col, InputGroup, Row, Container, Form, FloatingLabel, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextInput from '../Controls/TextInput';
import { updateCharacterProperty } from '../../slices/dcc/charactersSlice';
import SelectInput from '../Controls/SelectInput';
import { dccReferences } from '../../references/dccReferences';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlusMinus,
	faShieldAlt,
	faArrowDownWideShort,
	faDiceD20,
	faHeartPulse,
	faMinus,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';
import DieSelector from '../Controls/DieSelector';
import { useState } from 'react';
import { addDiceRoll, dice, formatDieResult, rollDice } from '../../slices/diceSlice';
import { birthAugers } from '../../references/dcc/birthAugers';
import Weapons from './Weapons';
import Equipment from './Equipment';
import Beasts from './Beasts';
import { WarriorCore } from './Warrior';
import Armor from './Armor';
import Leveller from './Leveller';
import FormattedDieResult from '../Controls/FormattedDieResult';
import Spells from './Spells';

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
					value={attribute.modifier}
					style={{ textAlign: 'center' }}
					onChange={(e) => handleChange('modifier.value', e.target.value)}
				/>
			</FloatingLabel>
			<Button
				style={{ minWidth: '80px' }}
				variant='outline-secondary'
				onClick={() => handleDiceRoll(name, { number: 1, die: dice.d20, modifier: attribute.currentModifier || 0 })}>
				<FontAwesomeIcon icon={faDiceD20} /> {attribute.currentModifier > -1 && '+'}
				{attribute.currentModifier}
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

	character = character && character.character;

	const [hitPointChange, setHitPointChange] = useState();
	const [showModal, setShowModal] = useState({ show: false });

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
		dispatch(updateCharacterProperty({ characterId: character.id, propertyPath: propertyPath, value: value }));
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

	const handleCriticalHitRoll = () => {
		let rollResult = rollDice(character.class.classLevel.critDie, 'Critical Hit');
		setShowModal({
			name: 'Critical Hit',
			roll: rollResult,
			show: true,
			result: references.critTables[character.class.classLevel.critTableNumber][rollResult.total],
		});
		dispatch(addDiceRoll(rollResult));
	};
	const handleFumbleRoll = () => {
		let rollResult = rollDice(character.fumbleDie, 'Fumble');
		setShowModal({
			name: 'Fumble',
			roll: rollResult,
			show: true,
			result: references.fumbleTable[rollResult.total],
		});
		dispatch(addDiceRoll(rollResult));
	};
	if (!character) {
		return <div></div>;
	}

	return (
		<Container fluid>
			{showModal.show && (
				<Modal show={showModal.show} onHide={() => setShowModal({ show: false })}>
					<Modal.Header>{showModal.name}</Modal.Header>
					<Modal.Body>
						<Row>
							{showModal.roll.dice &&
								showModal.roll.dice.map((die, dieIndex) => (
									<Col key={dieIndex} className='b'>
										<FormattedDieResult die={die} />
									</Col>
								))}
						</Row>
						<Row class='mb-4'>
							<Col>{showModal.result.text}</Col>
						</Row>

						{showModal.result.rolls &&
							showModal.result.rolls.map((roll, rollIndex) => {
								return (
									<Row key={rollIndex}>
										<Col>
											<Button
												variant='outline-secondary'
												onClick={() =>
													handleDiceRoll(showModal.result.rolls.name || showModal.name, showModal.result.rolls)
												}>
												<FontAwesomeIcon icon={faDiceD20} />
												<FormattedDieResult die={roll} />
											</Button>
										</Col>
									</Row>
								);
							})}
						<Row>
							<Col></Col>
						</Row>
					</Modal.Body>
					<Modal.Footer>
						<Button variant='outline-secondary' onClick={() => setShowModal({ show: false })}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>
			)}
			<Row className='mt-2'>
				<Col xs='12' lg='3'>
					<Row className='pb-2'>
						<Col xs='6'>
							<div className='w-100' style={{ border: '1px solid black', height: '110px', borderRadius: '4px' }}>
								<div
									style={{
										paddingLeft: '4px',
										borderBottom: '1px solid black',
										textWrap: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}>
									<FontAwesomeIcon icon={faShieldAlt} /> Armor Class
								</div>
								<div>
									<input
										value={character.armorClass.current}
										onChange={(e) => handleChange('armorClass.current', e.target.value)}
										type='number'
										style={{
											textAlign: 'center',
											fontSize: '40px',
											width: '100%',
											height: '51px',
											border: '0px',
											padding: '0px',
											margin: '0px',
											marginBottom: '-4px',
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
											marginTop: '4px',
										}}>
										Base: {character.armorClass.base}
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
											marginBottom: '-4px',
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
											marginTop: '4px',
										}}
										onClick={() => handleDiceRoll('Inititive', character.inititive.dice, 'inititive.current')}>
										<FontAwesomeIcon icon={faDiceD20} /> {formatDieResult(character.inititive.dice)}
									</div>
								</div>
							</div>
						</Col>
					</Row>
					<Row className='pb-2'>
						<Col xs='12'>
							<div
								className='w-100'
								style={{ backgroundColor: 'white', border: '1px solid black', height: '110px', borderRadius: '4px' }}>
								<div style={{ paddingLeft: '4px', borderBottom: '1px solid black' }}>
									<FontAwesomeIcon icon={faHeartPulse} /> Hit Points
								</div>
								<Row>
									<Col xs='5'>
										<input
											value={character.hitPoints.current || 0}
											type='number'
											onChange={(e) => handleChange('hitPoints.current', e.target.value)}
											style={{
												width: '100%',
												textAlign: 'center',
												fontSize: '40px',
												height: '51px',
												border: '0px',
												padding: '0px',
												margin: '0px',
												marginBottom: '-4px',
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
										marginTop: '4px',
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
													width: '100%',
												}}
												value={character.hitPoints.max || 0}
												onChange={(e) => handleChange('hitPoints.max', e.target.value)}
											/>
										</Col>
									</Row>
								</div>
							</div>
						</Col>
					</Row>
					<Row className='pb-2'>
						<Col xs='12'>
							<div className='form-control'>
								<label style={{ transform: 'scale(.85)' }}>Action Dice</label>
								<br />
								<Row>
									{character.class.classLevel &&
										Object.keys(character.class.classLevel.actionDice).map((actionDie, actionDieIndex) => {
											return (
												<Col lg='6' key={actionDieIndex} className='mt-1'>
													<Button
														size='sm'
														variant='outline-secondary'
														key={actionDieIndex}
														className='w-100'
														onClick={() => {
															let actionDice = [
																{ name: 'Action Die', ...character.class.classLevel.actionDice[actionDie] },
															];
															if (character.class.classLevel.deedDie) {
																actionDice[0].name = 'Action Die';
																actionDice.push({ name: 'Deed Die', ...character.class.classLevel.deedDie });
															}
															handleActionDiceRoll(`Action Die ${actionDieIndex + 1}`, actionDice);
														}}>
														<FontAwesomeIcon icon={faDiceD20} />
														<FormattedDieResult die={character.class.classLevel.actionDice[actionDie]} />
													</Button>
												</Col>
											);
										})}
								</Row>
							</div>
						</Col>
					</Row>
					<Row className='pb-2'>
						<Col>
							<Button className='w-100' variant='outline-success' onClick={() => handleCriticalHitRoll()}>
								<FontAwesomeIcon icon={faDiceD20} /> Critical Hit
							</Button>
						</Col>
						<Col>
							<Button className='w-100' variant='outline-danger' onClick={() => handleFumbleRoll()}>
								<FontAwesomeIcon icon={faDiceD20} /> Fumble
							</Button>
						</Col>
					</Row>
					<Row>
						<Col>
							{character.class.key === 'warrior' && (
								<WarriorCore character={character} onRollDice={handleDiceRoll} onChange={handleChange} />
							)}
						</Col>
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
								value={character.checkModifier}
								onChange={(e) => handleChange('checkModifier', e.target.value)}
							/>
						</Col>
						<Col lg='2'>
							{character.class.key !== 'warrior' && (
								<TextInput
									label='Melee Attack'
									className='text-center'
									value={character.meleeAttackModifier}
									onChange={(e) => handleChange('meleeAttackModifier', e.target.value)}
								/>
							)}
						</Col>
						<Col lg='2'>
							{character.class.key !== 'warrior' && (
								<TextInput
									label='Melee Damage'
									className='text-center'
									value={character.meleeDamageModifier}
									onChange={(e) => handleChange('meleeDamageModifier', e.target.value)}
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
								value={character.reflexModifier}
								onChange={(e) => handleChange('reflexModifier', e.target.value)}
							/>
						</Col>
						<Col lg='2'>
							{character.class.key !== 'warrior' && (
								<TextInput
									label='Missile Attack'
									className='text-center'
									value={character.missileAttackModifier}
									onChange={(e) => handleChange('missileAttackModifier', e.target.value)}
								/>
							)}
						</Col>
						<Col lg='2'>
							{character.class.key !== 'warrior' && (
								<TextInput
									label='Missile Damage'
									className='text-center'
									value={character.missileDamageModifier}
									onChange={(e) => handleChange('missileDamageModifier', e.target.value)}
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
								value={character.fortitudeModifier}
								onChange={(e) => handleChange('fortitudeModifier', e.target.value)}
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
								value={character.willpowerModifier}
								onChange={(e) => handleChange('willpowerModifier', e.target.value)}
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
								value={character.birthAuger ? character.birthAuger.key : ''}
								onChange={(value) => handleChange('birthAuger.key', value)}
								options={Object.keys(references.birthAugers).map((birthAuger) => {
									return {
										value: references.birthAugers[birthAuger].key,
										label: `${references.birthAugers[birthAuger].key}-${references.birthAugers[birthAuger].auger}`,
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
			<Spells characterId={characterId} />
			<Row className='pt-2'>
				<Col>
					<Form.Control
						as='textarea'
						rows='10'
						placeholder='Notes'
						value={character.notes || ''}
						onChange={(e) => handleChange('notes', e.target.value)}
					/>
				</Col>
			</Row>
			{/* <pre>
				<code>{JSON.stringify(character.fumbleDie, null, 2)}</code>
			</pre> */}
			<pre>
				<code>
					TODO: <br />
					Birth Auger stat affects <br />
					Money <br />
					Add Trained Weapons list to Fundamentals
					<br />
					SelectInput height
					<br />
					Show Spell History
					<br />
					Patrons
					<br />
					Patrons Taints for spell failures
					<br />
					Beast Notes
					<br />
					BUGS:
					<br />
					Beasts inheriting HP from character (because of the ref to the top level object...) <br />
					Title = [object Object] for Level 0<br />
					<br />
				</code>
			</pre>
		</Container>
	);
};

export default CharacterCore;
