import { Button, ButtonGroup, Col, Dropdown, DropdownButton, Nav, Row } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addCharacter, generateCharacter } from '../slices/dcc/charactersSlice';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';

const CharacterTabs = () => {
	let [showDeceased, setShowDeceased] = useState(false);

	let characters = useSelector((state) => {
		return state.dccCharacters;
	});

	characters =
		characters &&
		characters
			.filter((character) => {
				if (showDeceased === true) return character;
				else return character.character.deceased !== true;
			})
			.map((character) => {
				return character.character;
			});

	const dispatch = useDispatch();

	const handleAddCharacter = (race) => {
		dispatch(addCharacter(generateCharacter(race)));
	};

	const toggleShowDeceased = () => {
		setShowDeceased(!showDeceased);
	};

	return (
		<div>
			<Nav variant='tabs' defaultActiveKey={characters && characters.length > 0 ? 1 : 0}>
				{characters &&
					characters.map((character, characterIndex) => {
						return (
							<Nav.Item key={characterIndex}>
								<Nav.Link as={Link} to={`/characters/${character.id}?${character.name}`} eventKey={character.id}>
									{character.name || '(No Name)'} {character.deceased && <FontAwesomeIcon icon={faSkullCrossbones} />}
								</Nav.Link>
							</Nav.Item>
						);
					})}
			</Nav>
			<div style={{ position: 'fixed', top: '0px', right: '0px', paddingRight: '10px', zIndex: 2 }}>
				<Dropdown as={ButtonGroup} style={{paddingRight: '4px'}}>
					<Button variant='outline-secondary' onClick={() => handleAddCharacter()}>
						<FontAwesomeIcon icon={faPlus} /> Add
					</Button>
					<Dropdown.Toggle variant='outline-secondary' split id='dropdown-split-basic' />
					<Dropdown.Menu>
						<Dropdown.Item  onClick={() => handleAddCharacter('human')}>Human</Dropdown.Item>
						<Dropdown.Item  onClick={() => handleAddCharacter('dwarf')}>Dwarf</Dropdown.Item>
						<Dropdown.Item  onClick={() => handleAddCharacter('elf')}>Elf</Dropdown.Item>
						<Dropdown.Item  onClick={() => handleAddCharacter('halfling')}>Halfling</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<Button variant='outline-secondary' title='show deceased' onClick={() => toggleShowDeceased()}>
					<FontAwesomeIcon icon={faSkullCrossbones} />
				</Button>
			</div>
			<Outlet />
		</div>
	);
};

export default CharacterTabs;
