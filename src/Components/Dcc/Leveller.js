import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Col, Row, Button, Dropdown, ButtonGroup, Form, InputGroup, FormLabel } from 'react-bootstrap';
import sword from '../../images/sword.png';

import { faShieldAlt, faPlus, faTrash, faInfoCircle, faWandMagicSparkles, faClover, faDiceD20, faArrowUp, fas } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { dccReferences } from '../../references/dccReferences';
import { updateCharacter } from '../../slices/dcc/charactersSlice';
import DieSelector from '../Controls/DieSelector';
import CoinSelector from '../Controls/CoinSelector';
import { addDiceRoll, dice, formatDieResult, rollDice } from '../../slices/diceSlice';
import SelectInput from '../Controls/SelectInput';
import { useEffect, useState } from 'react';
import { setValue, evaluate, deepCopy } from '../../objectEvaluator/evaluator2';

const Leveller = (props) => {
	const { characterId, show, onClose } = props;
	const [leveledModel, setLeveledModel] = useState();
	const [leveledCharacter, setLeveledCharacter] = useState();
	const [hitPointsIncrease, setHitPointsIncrease] = useState();
	const dispatch = useDispatch();
	const references = dccReferences;

	let { character, model } = useSelector((state) => {
		let character = state.dccCharacters.find((character) => character.id == characterId);
		return { character: character.character, model: character.model };
	});

	useEffect(() => {
		if (leveledCharacter) return;
		setLeveledCharacter(JSON.parse(JSON.stringify(character)));
		setLeveledModel(JSON.parse(JSON.stringify(model)));
	}, []);

	const handleChange = (propertyPath, value) => {
		let newLeveledCharacter = JSON.parse(JSON.stringify(leveledCharacter));
		// setValue(newLeveledCharacter, propertyPath, value, references);

		let newModel = setValue(deepCopy(leveledModel), propertyPath, value);
		let newCharacter = evaluate(deepCopy(newModel), deepCopy(dccReferences));

		if (propertyPath === 'class._ref') {
			let hitPointsIncrease = rollDice(newCharacter.class.hitDice);
			setHitPointsIncrease(hitPointsIncrease);
			newModel = setValue(deepCopy(newModel), 'hitPoints.base', leveledCharacter.hitPoints.max + hitPointsIncrease.total);
			newCharacter = evaluate(deepCopy(newModel), deepCopy(dccReferences));
		}

		setLeveledModel(newModel);
		setLeveledCharacter(newCharacter);

	};

	const handleSave = () => {
		// let newLeveledCharacter = JSON.parse(JSON.stringify(leveledCharacter));
		dispatch(updateCharacter(leveledModel));
		onClose();
	};

	const handleCancel = () => {
		setLeveledCharacter(undefined);
		onClose();
	};

	if (!leveledCharacter || !show) return <div></div>;

	return (
		// animation={false} is needed to prevent it from blocking input.
		<Modal show={show} animation={false}>
			<Modal.Header>
				<Row className='w-100 align-items-center'>
					<Col>
						<b>{leveledCharacter.name}</b> (Level {character.level.key})
					</Col>
					<Col></Col>
					<Col className='text-end'>
						<Button variant='outline-success' onClick={() => handleChange('level._ref', `levels.${parseInt(leveledCharacter.level.key) + 1}`)}>
							<FontAwesomeIcon icon={faArrowUp} /> Level {parseInt(character.level.key) + 1}
						</Button>
					</Col>
				</Row>
			</Modal.Header>
			<Modal.Body>
				{leveledCharacter.level.key === 1 && (
					<Row className='mt-1'>
						<Col>
							<SelectInput
								label='Class'
								value={leveledCharacter.class && leveledCharacter.class.key}
								options={Object.keys(references.classes).map((option) => {
									return { label: references.classes[option].name, value: option };
								})}
								onChange={(value) => handleChange('class._ref', `classes.${value}`)}
							/>
						</Col>
					</Row>
				)}
				{leveledCharacter.class && leveledCharacter.class.key === 'warrior' && (
					<div>
						<Row className='mt-1'>
							<Col>
								<SelectInput
									label='Lucky Weapon'
									value={leveledCharacter.class.luckyWeapon}
									options={Object.keys(references.weapons).map((option) => {
										return { label: references.weapons[option].type, value: option };
									})}
									onChange={(value) => handleChange('class.luckyWeapon', value)}
								/>
							</Col>
						</Row>
						<Row className='mt-1'>
							<Col>
								<div style={{ fontSize: '11pt', color: 'rgba(var(--bs-body-color-rgb),.65)' }}>Max Hit Points</div>
							</Col>
						</Row>
						<Row className='mt-1 align-items-center'>
							<Col>
								<div className='w-100' style={{ border: '1px solid black', borderRadius: '4px' }}>
									<div style={{ textAlign: 'center', borderBottom: '1px solid black' }}>Current</div>
									<div
										style={{
											textAlign: 'center',
											fontSize: '20px',
											width: '100%',
											padding: '0px',
											margin: '0px'
										}}>
										{character.hitPoints.max}
									</div>
								</div>
							</Col>
							<Col sm='auto'>+</Col>
							<Col>
								<div className='w-100' style={{ border: '1px solid black', borderRadius: '4px' }}>
									<div style={{ textAlign: 'center', borderBottom: '1px solid black' }}>1d12</div>
									<div
										style={{
											textAlign: 'center',
											fontSize: '20px',
											width: '100%',
											padding: '0px',
											margin: '0px'
										}}>
										{hitPointsIncrease.total}
									</div>
								</div>
							</Col>
							<Col sm='auto'>=</Col>
							<Col>
								<div className='w-100' style={{ border: '1px solid black', borderRadius: '4px' }}>
									<div style={{ textAlign: 'center', borderBottom: '1px solid black' }}>New</div>
									<div
										style={{
											textAlign: 'center',
											fontSize: '20px',
											width: '100%',
											padding: '0px',
											margin: '0px'
										}}>
										{character.hitPoints.max + hitPointsIncrease.total}
									</div>
								</div>
							</Col>
						</Row>
					</div>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button className='w-25' variant='outline-primary' onClick={() => handleSave()}>
					Ok
				</Button>
				<Button className='w-25' variant='outline-secondary' onClick={() => handleCancel()}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default Leveller;
