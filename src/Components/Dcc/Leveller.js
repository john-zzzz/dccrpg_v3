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
import { setValue } from '../../objectEvaluator/evaluator';

const Leveller = (props) => {
	const { characterId, show, onClose } = props;
	const [leveledCharacter, setLeveledCharacter] = useState();
	const [hitPointsIncrease, setHitPointsIncrease] = useState();
	const dispatch = useDispatch();
	const references = dccReferences;

	let character = useSelector((state) => {
		return state.dccCharacters.find((character) => character.id == characterId);
	});

	useEffect(() => {
		if (leveledCharacter) return;
		setLeveledCharacter(JSON.parse(JSON.stringify(character)));
	}, []);

	const handleChange = (propertyPath, value) => {
		let newLeveledCharacter = JSON.parse(JSON.stringify(leveledCharacter));
		setValue(newLeveledCharacter, propertyPath, value, references);

		if (propertyPath === 'class') {
            let hitPointsIncrease = rollDice(newLeveledCharacter.class.hitDice);
            setHitPointsIncrease(hitPointsIncrease);
			setValue(newLeveledCharacter, 'hitPoints.max.value', leveledCharacter.hitPoints.max.value + hitPointsIncrease.total, references);
		}

		setLeveledCharacter(newLeveledCharacter);
	};

	const handleSave = () => {
		let newLeveledCharacter = JSON.parse(JSON.stringify(leveledCharacter));
		dispatch(updateCharacter(newLeveledCharacter));
		onClose();
	};

	const handleCancel = () => {
		setLeveledCharacter(undefined);
        onClose();
	};

	if (!leveledCharacter) return <div></div>;

	return (
        // animation={false} is needed to prevent it from blocking input.
		<Modal show={show} animation={false}>
			<Modal.Header>
				<Row className='w-100 align-items-center'>
					<Col>
						<b>{leveledCharacter.name.name}</b> (Level {character.levelNumber})
					</Col>
					<Col></Col>
					<Col className='text-end'>
						<Button variant='outline-success' onClick={() => handleChange('levelNumber', parseInt(leveledCharacter.levelNumber) + 1)}>
							<FontAwesomeIcon icon={faArrowUp} /> Level {parseInt(character.levelNumber) + 1}
						</Button>
					</Col>
				</Row>
			</Modal.Header>
			<Modal.Body>
				{leveledCharacter.levelNumber === 1 && (
					<Row className='mt-1'>
						<Col>
							<SelectInput
								label='Class'
								value={leveledCharacter.class && leveledCharacter.class.key}
								options={Object.keys(references.classes).map((option) => {
									return { label: references.classes[option].name, value: option };
								})}
								onChange={(value) => handleChange('class', references.classes[value])}
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
								<div style={{ fontSize: '11pt', color: 'rgba(var(--bs-body-color-rgb),.65)' }}>Hit Points</div>
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
										{leveledCharacter.hitPoints.current.value}
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
										{leveledCharacter.hitPoints.current.value + hitPointsIncrease.total}
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
