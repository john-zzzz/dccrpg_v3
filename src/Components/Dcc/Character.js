import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSkullCrossbones, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import CharacterFundamentals from './CharacterFundamentals';
import CharacterCore from './CharacterCore';
import DiceHistory from '../Controls/DiceHistory';
import Leveller from './Leveller';
import { removeCharacter, updateCharacterProperty } from '../../slices/dcc/charactersSlice';

const Character = () => {
	let contentTop = '50px';
	const leftDrawerInitialWidth = '65px';

	const [showLeveller, setShowLeveller] = useState(false);
	const [leftDrawer, setLeftDrawer] = useState({ isOpen: false, width: leftDrawerInitialWidth });

	const params = useParams();
	let characterId = params.characterId;

	let character = useSelector((state) => {
		return state.dccCharacters.find((character) => character.id == characterId);
	});

	character = character && character.character;

	const dispatch = useDispatch();
	const handleChange = (propertyPath, value) => {
		dispatch(updateCharacterProperty({ characterId: character.id, propertyPath: propertyPath, value: value }));
	};

	useEffect(() => {
		document.title = character ? character.name : 'Character';
	}, [character]);

	const handleFundamentalsExpandCollapse = (width) => {
		let isOpen = leftDrawer.width !== leftDrawerInitialWidth;
		setLeftDrawer({ isOpen: !isOpen, width: width || isOpen ? leftDrawerInitialWidth : '300px' });
	};

	const handleShowLeveller = (show) => {
		setShowLeveller(show);
	};

	const handleDeleteCharacter = () => {
		dispatch(removeCharacter({ id: character.id }));
	};

	if (!character) {
		// TODO, put something fun here, character falling into a pit or something.
		return <div>Character not found</div>;
	}

	return (
		<div>
			{showLeveller && <Leveller show={showLeveller} onClose={() => handleShowLeveller(false)} characterId={characterId} />}
			<div
				style={{
					overflowX: 'hidden',
					overflowY: 'auto',
					position: 'fixed',
					top: contentTop,
					left: '0px',
					width: leftDrawer.width,
					bottom: '0px',
					scrollbarWidth: 'thin',
					borderRight: '1px solid #ccc'
				}}>
				<Row style={{ paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px' }}>
					<Col>
						<Row className='align-items-center'>
							<Col xs='auto' className='m-0'>
								<Button variant='outline-secondary' onClick={() => handleFundamentalsExpandCollapse()}>
									{leftDrawer.isOpen ? <FontAwesomeIcon icon={faArrowLeft} /> : <FontAwesomeIcon icon={faUser} />}
								</Button>
							</Col>
							{leftDrawer.isOpen && (
								<>
									<Col className='m-1'>
										<Button className='w-100' variant='outline-danger' onClick={() => handleChange('deceased', !character.deceased)}>
											{leftDrawer.isOpen ? <FontAwesomeIcon icon={faSkullCrossbones} /> : <FontAwesomeIcon icon={faUser} />}
										</Button>
									</Col>
									{character.deceased && (
										<Col>
											<Button className='w-100' variant='outline-danger' onClick={() => handleDeleteCharacter()}>
												{leftDrawer.isOpen ? <FontAwesomeIcon icon={faTrash} /> : <FontAwesomeIcon icon={faTrash} />}
											</Button>
										</Col>
									)}
									<Col></Col>
								</>
							)}
						</Row>
						{leftDrawer.isOpen && (
							<>
								<Row className='pt-1'>
									<Col>
										<CharacterFundamentals onShowLeveller={(show) => handleShowLeveller(show)} />
									</Col>
								</Row>
							</>
						)}
					</Col>
				</Row>
			</div>
			<div
				style={{
					// paddingRight: rightDrawerWidth,
					overflow: 'auto',
					position: 'fixed',
					top: contentTop,
					left: leftDrawer.width,
					right: 0,
					// right: rightDrawerWidth,

					bottom: '0px'
				}}>
				<Container fluid>
					<CharacterCore />
				</Container>
			</div>
			<DiceHistory />
		</div>
	);
};

export default Character;
