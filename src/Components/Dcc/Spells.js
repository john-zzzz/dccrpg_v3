import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Button, Dropdown, ButtonGroup, Form, InputGroup, Modal, Alert } from 'react-bootstrap';
import bowAndArrow from '../../images/bow-and-arrow.png';
import sword from '../../images/sword.png';

import { faShieldAlt, faPlus, faTrash, faInfoCircle, faWandMagicSparkles, faClover, faBook } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { dccReferences } from '../../references/dccReferences';
import { updateCharacterProperty } from '../../slices/dcc/charactersSlice';
import DieSelector from '../Controls/DieSelector';
import CoinSelector from '../Controls/CoinSelector';
import { addDiceRoll, dice, rollDice } from '../../slices/diceSlice';
import { useEffect, useState } from 'react';
import DurationSelector from '../Controls/DurationSelector';
import { deepCopy, deepFind, setValue } from '../../objectEvaluator/evaluator2';
import FormattedDieResult from '../Controls/FormattedDieResult';
import manualPdf from '../../Documents/Full Manual.pdf';

const SpellCast = (props) => {
	const { characterId, spellKey, onClose } = props;
	const references = dccReferences;

	const [spell, setSpell] = useState();

	let character = useSelector((state) => {
		return state.dccCharacters.find((character) => character.id == characterId);
	});

	character = character && character.character;

	useEffect(() => {
		character && setSpell(character.spells[spellKey]);
	}, [character]);

	const handleChange = (propertyPath, value) => {
		let newSpell = deepCopy(spell);
		setValue(newSpell, propertyPath, value);
		setSpell(newSpell);
	};

	const handleCastSpell = () => {
		let castingRollResult = rollDice(spell.castingDie).dice[0];

		// let castingRollResult = rollDice({ number: 1, die: dice.d2, name: 'Cast' }).dice[0];
		let castingResult = spell.results.find((result) => result.roll === castingRollResult.total);

		let result = {
			castingResult: { rollResult: castingRollResult, ...castingResult }
		};

		if (result.castingResult.failure) {
			if (result.castingResult.failureDice) {
				result.failureResult = {};
				result.failureResult.rollResult = rollDice(result.castingResult.failureDice.dice).dice[0];
				// result.failureResult.rollResult = rollDice({number: 1, die: dice.d2, modifier: -2}).dice[0];
				result.failureResult = {
					...result.failureResult,
					...result.castingResult.failureDice.results.find((failureResult) => failureResult.roll === result.failureResult.rollResult.total)
				};

				if (result.failureResult.corruption) {
					result.corruption = {};
					result.corruption.rollResult = rollDice(spell.corruption.dice).dice[0];
					result.corruption = {
						...result.corruption,
						...spell.corruption.results.find((corruptionResult) => corruptionResult.roll === result.corruption.rollResult.total)
					};
				}

				if (result.failureResult.patronTaint) {
					result.patronTaint = 'Patron Taint (TODO)';
				}

				if (result.failureResult.misfire) {
					result.misfire = {};
					result.misfire.rollResult = rollDice(spell.misfire.dice).dice[0];
					result.misfire = { ...result.misfire, ...spell.misfire.results.find((misfireResult) => misfireResult.roll === result.misfire.rollResult.total) };
				}
			}
		} else {
			result.manifestation = {};
			result.manifestation.rollResult = rollDice(spell.manifestation.dice).dice[0];
			result.manifestation = {
				...result.manifestation,
				...spell.manifestation.results.find((manifestationResult) => manifestationResult.roll === result.manifestation.rollResult.total)
			};
		}

		handleChange('result', result);
	};

	if (!spell) return <div></div>;
	return (
		<Modal show={true}>
			<Modal.Header>
				<Modal.Title>{spell.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row className='pb-2'>
					<Col>
						<i>{spell.general}</i>
					</Col>
				</Row>
				<Row className='pb-2'>
					<Col lg='8'>
						<DieSelector value={spell.castingDie} onChange={(property, value) => handleChange(`castingDie.${property}`, value)} />
					</Col>
					<Col>
						<Button className='w-100' variant='outline-secondary' onClick={() => handleCastSpell()}>
							<FontAwesomeIcon icon={faWandMagicSparkles} /> Cast
						</Button>
					</Col>
				</Row>
				{spell.result && (
					<Alert variant={spell.result.castingResult.failure ? 'danger' : 'success'}>
						<Row className='bb-1'>
							<Col>
								<h6>
									<FormattedDieResult die={spell.result.castingResult.rollResult} />
								</h6>
							</Col>
						</Row>
						{spell.result.manifestation && (
							<Row className='bb-1'>
								<Col>
									<FormattedDieResult die={spell.result.manifestation.rollResult} />
									{spell.result.manifestation.result}
								</Col>
							</Row>
						)}
						<Row>
							<Col>{spell.result.castingResult.result}</Col>
						</Row>
						{spell.result.failureResult && (
							<>
								<Row className='bt-1'>
									<Col>
										<h6>
											<FormattedDieResult die={spell.result.failureResult.rollResult} />
										</h6>
									</Col>
								</Row>
							</>
						)}

						{spell.result.corruption && (
							<>
								<Row className='bt-1'>
									<Col>
										<h6>
											<FormattedDieResult die={spell.result.corruption.rollResult} />
										</h6>
									</Col>
								</Row>
								<Row>
									<Col>{spell.result.corruption.result}</Col>
								</Row>
							</>
						)}
						{spell.result.patronTaint && (
							<>
								<Row className='bt-1'>
									<Col>
										<h6>{spell.result.patronTaint}</h6>
									</Col>
								</Row>
							</>
						)}
						{spell.result.misfire && (
							<>
								<Row className='bt-1'>
									<Col>
										<h6>
											<FormattedDieResult die={spell.result.misfire.rollResult} />
										</h6>
									</Col>
								</Row>
								<Row>
									<Col>{spell.result.misfire.result}</Col>
								</Row>
							</>
						)}
					</Alert>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-secondary' onClick={() => onClose()}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
const Spells = (props) => {
	const { characterId } = props;
	const [showSpellCast, setShowSpellCast] = useState({ show: false });
	const dispatch = useDispatch();
	const references = dccReferences;

	let character = useSelector((state) => {
		return state.dccCharacters.find((character) => character.id == characterId);
	});

	character = character && character.character;

	const handleChange = (propertyPath, value) => {
		dispatch(updateCharacterProperty({ characterId: character.id, propertyPath: propertyPath, value: value }));
	};

	const handleAddSpell = (spellKey) => {
		let spellsLength = character.spells ? Object.keys(character.spells).length - 1 : 0;
		handleChange(`spells.spell${spellsLength + 1}`, references.spellList[spellKey]);
	};

	const handleDeleteSpell = (spellKey) => {
		let newSpells = JSON.parse(JSON.stringify(character.spells));
		delete newSpells[spellKey];
		handleChange('spells', newSpells);
	};

	const handleCastSpell = (spellKey) => {
		// const spell = character.spells[spellKey];

		setShowSpellCast({ show: true, spellKey: spellKey });
	};

	const handleHideSpellCastResult = () => {
		setShowSpellCast({ ...showSpellCast, show: false });
	};
	return (
		<>
			{showSpellCast.show && <SpellCast characterId={characterId} spellKey={showSpellCast.spellKey} onClose={handleHideSpellCastResult} />}
			<Row className='bt-1 pt-1 align-items-center'>
				<Col lg='1'>
					<b>Spells</b>
				</Col>
				<Col lg='2'>
					<Dropdown>
						<Dropdown.Toggle variant='outline-secondary'>
							<FontAwesomeIcon icon={faPlus} /> Add{' '}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{Object.keys(references.spellList).map((spellKey, spellIndex) => {
								let spell = references.spellList[spellKey];
								return (
									<Dropdown.Item key={spellIndex} onClick={() => handleAddSpell(spellKey)}>
										{spell.name}
									</Dropdown.Item>
								);
							})}
						</Dropdown.Menu>
					</Dropdown>
				</Col>
				{character.spells && Object.keys(character.spells).length > 0 && (
					<>
						<Col lg='2'></Col>
						<Col lg='2'>Range</Col>
						<Col lg='2'>Casting Time</Col>
						<Col lg='2'>Duration</Col>
						<Col lg='1'>Cast</Col>
					</>
				)}
			</Row>
			{character.spells &&
				Object.keys(character.spells).map((spellKey, spellIndex) => {
					let spell = character.spells[spellKey];
					return (
						<Row key={spellIndex} className='pb-1 bb-1'>
							<Col>
								<Row className='mt-1'>
									<Col lg='1'>
										<ButtonGroup>
											<Button variant='outline-danger' onClick={() => handleDeleteSpell(spellKey)}>
												<FontAwesomeIcon icon={faTrash} />
											</Button>
										</ButtonGroup>
									</Col>
									<Col lg='4'>
										<InputGroup>
											<Form.Control value={spell.name} onChange={(e) => handleChange(`spells.${spellKey}.name`, e.target.value)} />
											<Button variant='outline-secondary' onClick={(e) => handleChange(`spells.${spellKey}.infoShown`, !spell.infoShown)}>
												<FontAwesomeIcon icon={faInfoCircle} />
											</Button>
											<Button variant='outline-secondary' href={`${manualPdf}#page=${spell.manualPage}`} target='_blank'>
												<FontAwesomeIcon icon={faBook} />
											</Button>
										</InputGroup>
									</Col>
									<Col lg='2'>
										<Form.Control value={spell.range} onChange={(e) => handleChange(`spells.${spellKey}.range`, e.target.value)} />
									</Col>
									<Col lg='2'>
										<DurationSelector
											value={spell.castingTime}
											onChange={(property, value) => handleChange(`spells.${spellKey}.castingTime.${property}`, value)}
										/>
									</Col>
									<Col lg='2'>
										<DurationSelector value={spell.duration} onChange={(property, value) => handleChange(`spells.${spellKey}.duration.${property}`, value)} />
									</Col>
									<Col lg='1'>
										<Button className='w-100' variant='outline-secondary' onClick={() => handleCastSpell(spellKey)}>
											<FontAwesomeIcon icon={faWandMagicSparkles} />
										</Button>
									</Col>
								</Row>
								{spell.infoShown && (
									<>
										<Row className='mt-1'>
											<Col lg='1'></Col>
											<Col lg='2'>
												<InputGroup>
													<InputGroup.Text>Level</InputGroup.Text>
													<InputGroup.Text>{spell.level}</InputGroup.Text>
												</InputGroup>
											</Col>
											<Col lg='4'>
												<InputGroup>
													<InputGroup.Text>Notes</InputGroup.Text>
													<Form.Control value={spell.notes || ''} onChange={(e) => handleChange(`spell.${spellKey}.notes`, e.target.value)} />
												</InputGroup>
											</Col>
											<Col lg='2'>
												{/* <CoinSelector value={spell.cost} onChange={(property, value) => handleChange(`spell.${spellKey}.cost.${property}`, value)} /> */}
											</Col>
										</Row>
										<Row className='mt-1'>
											<Col lg='1'></Col>
											<Col lg='11'>
												<i>{spell.general}</i>
											</Col>
										</Row>
									</>
								)}
							</Col>
						</Row>
					);
				})}
		</>
	);
};

export default Spells;
