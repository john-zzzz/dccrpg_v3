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

const Spells = (props) => {
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

	const handleAddSpell = (spell) => {
		let spellsLength = character.spells ? Object.keys(character.spells).length - 1 : 0;
		handleChange(`spells.spell${spellsLength + 1}`, spell);
	};

	const handleDeleteSpell = (spellKey) => {
		let newSpells = JSON.parse(JSON.stringify(character.spells));
		delete newSpells[spellKey];
		handleChange('spells', newSpells);
	};

	return (
		<>
			<Row className='bt-1 pb-1 pt-1 align-items-center'>
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
								let spell = references.spells[spellKey];
								return (
									<Dropdown.Item key={spellIndex} onClick={() => handleAddSpell(spell)}>
										{spell.type}
									</Dropdown.Item>
								);
							})}
						</Dropdown.Menu>
					</Dropdown>
				</Col>
				{Object.keys(character.spells).length > 0 && (
					<>
						<Col lg='2'></Col>
						<Col lg='1'>Qty</Col>
						<Col lg='3'>Damage</Col>
						<Col lg='3'>Attack</Col>
					</>
				)}
			</Row>
			{character.spells &&
				Object.keys(character.spells).map((spellKey, spellIndex) => {
					let spell = character.spells[spellKey];
					return (
						<Row key={spellIndex} className='pb-1 bb-1'>
							<Col></Col>
						</Row>
					);
				})}
		</>
	);
};

export default Spells;
