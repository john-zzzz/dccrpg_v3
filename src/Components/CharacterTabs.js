import { Nav } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addCharacter, generateCharacter } from '../slices/dcc/charactersSlice';
import { Link, Outlet } from 'react-router-dom';

const CharacterTabs = () => {
	const characters = useSelector((state) => {
		return state.dccCharacters;
	});


	const dispatch = useDispatch();

	const handleAddCharacter = () => {
		dispatch(addCharacter(generateCharacter()));
	};

	return (
		<div>
			<Nav variant='tabs' defaultActiveKey={characters && characters.length > 0 ? 1 : 0}>
				<Nav.Link
					style={{ color: 'green', fontWeight: 'bold', border: '1px solid transparent' }}
					onClick={() => {
						handleAddCharacter();
					}}>
					<FontAwesomeIcon icon={faPlus} /> Add
				</Nav.Link>
				{characters &&
					characters.map((character, characterIndex) => {
						return (
							<Nav.Item key={characterIndex}>
								<Nav.Link as={Link} to={`/characters/${character.id}?${character.name.name}`} eventKey={character.id}>
									{character.name.name || '(No Name)'}
								</Nav.Link>
							</Nav.Item>
						);
					})}
			</Nav>
			<Outlet />
		</div>
	);
};

export default CharacterTabs;
