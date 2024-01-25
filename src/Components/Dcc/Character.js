import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import CharacterFundamentals from './CharacterFundamentals';
import CharacterCore from './CharacterCore';
import DiceHistory from '../Controls/DiceHistory';

const Character = () => {
	let contentTop = '50px';
	const leftDrawerInitialWidth = '65px';

	const [leftDrawer, setLeftDrawer] = useState({ isOpen: false, width: leftDrawerInitialWidth });

	const params = useParams();
	let characterId = params.characterId;

	let character = useSelector((state) => {
		return state.dccCharacters.find((character) => character.id == characterId);
	});

	useEffect(() => {
		document.title = character ? character.name.name : 'Character';
	}, [character]);

	const handleFundamentalsExpandCollapse = (width) => {
		let isOpen = leftDrawer.width !== leftDrawerInitialWidth;
		setLeftDrawer({ isOpen: !isOpen, width: width || isOpen ? leftDrawerInitialWidth : '300px' });
	};

	if (!character) {
		// TODO, put something fun here, character falling into a pit or something.
		return <div>Character not found</div>;
	}

	return (
		<div>
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
							{leftDrawer.isOpen && <Col className='m-1'>Additional Actions</Col>}
						</Row>
						{leftDrawer.isOpen && (
							<>
								<Row className='pt-1'>
									<Col>
										<CharacterFundamentals />
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
