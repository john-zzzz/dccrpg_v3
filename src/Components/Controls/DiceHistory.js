import { Button, Col, InputGroup, Modal, Row, Toast, ToastContainer } from 'react-bootstrap';
import DieSelector from './DieSelector';
import { addDiceRoll, dice, formatDieResult, rollDice } from '../../slices/diceSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20, faHistory } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const DiceHistory = () => {
	const [currentDie, setCurrentDie] = useState({ number: 1, die: dice.d20, modifier: 0 });
	const [showRollHistory, setShowRollHistory] = useState(false);
	const dispatch = useDispatch();

	const rolls = useSelector((state) => {
		return state.dice;
	});

	const handleDiceChange = (property, value) => {
		let newDice = { ...currentDie };
		newDice[property] = value;
		setCurrentDie(newDice);
	};

	const handleDiceRoll = () => {
		let rollResult = rollDice(currentDie, formatDieResult(currentDie));
		dispatch(addDiceRoll(rollResult));
	};
	const handleShowRollHistoryChange = () => {
		setShowRollHistory(!showRollHistory);
	};

	return (
		<ToastContainer containerPosition='fixed' style={{ paddingLeft: '50px' }} position='bottom-end'>
			<Toast show={true}>
				<Toast.Body className='m-0'>
					{showRollHistory && (
						<Row className='bb-1 pb-1'>
							<Col>
								<div
									style={{
										maxHeight: '300px',
										overflowY: 'auto',
										overflowX: 'hidden'
									}}>
									{rolls.history.map((roll, rollIndex) => {
										return (
											<div key={rollIndex}>
												<Row>
													<Col className='b'>{roll.name}</Col>
												</Row>
												<Row className='bb-1 pb-1 pt-1'>
													<Col>
														{roll.dice.map((die, dieKey) => {
															return (
																<Row key={dieKey}>
																	<Col xs='9'>{die.name}{die.name && ': '} {formatDieResult(die)}</Col>
																</Row>
															);
														})}
													</Col>
													<Col xs='3'>
														<div className='h4 text-center w-100' style={{ border: '1px solid #ccc', borderRadius: '5px' }}>
															{roll.total}
														</div>
													</Col>
												</Row>
											</div>
										);
									})}
								</div>
							</Col>
						</Row>
					)}

					{rolls.currentRoll && (
						<>
							<Row>
								<Col xs='9' className='b'>
									{rolls.currentRoll.name}
								</Col>
								<Col>
									<Button variant='outline-secondary' className='w-100' size='sm' onClick={() => handleShowRollHistoryChange()}>
										<FontAwesomeIcon icon={faHistory} />
									</Button>
								</Col>
							</Row>
							<Row className='bb-1 pb-1 pt-1'>
								<Col>
									{rolls.currentRoll.dice.map((die, dieKey) => {
										return (
											<Row key={dieKey}>
												<Col xs='9'>{die.name}{die.name && ': '} {formatDieResult(die)}</Col>
											</Row>
										);
									})}
								</Col>
								<Col xs='3'>
									<div className='h3 text-center w-100' style={{ border: '1px solid black', borderRadius: '5px' }}>
										{rolls.currentRoll.total}
									</div>
								</Col>
							</Row>
						</>
					)}
					<Row className='pt-1'>
						<Col xs='9'>
							<InputGroup>
								<DieSelector value={currentDie} onChange={(property, value) => handleDiceChange(property, value)} />
							</InputGroup>
						</Col>
						<Col xs='3'>
							<Button className='w-100' variant='outline-secondary' onClick={() => handleDiceRoll()}>
								<FontAwesomeIcon icon={faDiceD20} />
							</Button>
						</Col>
					</Row>
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};

export default DiceHistory;
