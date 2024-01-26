import { Button, Col, InputGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TextInput from '../Controls/TextInput';
import { updateCharacterProperty } from '../../slices/dcc/charactersSlice';
import SelectInput from '../Controls/SelectInput';
import { dccReferences } from '../../references/dccReferences';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusMinus } from '@fortawesome/free-solid-svg-icons';
import DieSelector from '../Controls/DieSelector';

const CharacterFundamentals = (props) => {
	const { onShowLeveller } = props;

	const params = useParams();
	let characterId = params.characterId;
	
	const dispatch = useDispatch();
	const references = dccReferences;
	let character = useSelector((state) => {
		return state.dccCharacters.find((character) => character.id == characterId);
	});

	const handleChange = (propertyPath, value) => {
		dispatch(updateCharacterProperty({ characterId: character.id, propertyPath: propertyPath, value: value }));
	};

	const handleShowLeveller = (show) => {
		onShowLeveller(show);
	};

	//TODO: Move this somewhere generic.
	const stripRefs = (object) => {
		let { ref, clone, copy, ...rest } = object;
		return rest;
	};

	if (!character) {
		return <div></div>;
	}

	return (
		<div>
			<Row className='mt-2'>
				<Col>
					<TextInput label='Name' value={character.name.name || ''} onChange={(e) => handleChange('name.name', e.target.value)} />
				</Col>
			</Row>
			<Row className='mt-2'>
				<Col>
					<TextInput label='Race' value={character.raceName.value || ''} disabled={true} />
				</Col>
			</Row>
			<Row className='mt-2'>
				<Col>
					<SelectInput
						label='Alignment'
						value={character.alignment.key}
						options={Object.keys(references.alignments).map((alignment) => {
							return { label: references.alignments[alignment].name, value: alignment };
						})}
						onChange={(value) => handleChange('alignment.key', value)}
					/>
				</Col>
			</Row>
			<Row className='mt-2'>
				<Col>
					<InputGroup>
						<TextInput label='Level' type='number' value={character.levelNumber} onChange={(e) => handleChange('levelNumber', parseInt(e.target.value))} />
						<TextInput label='XP' type='number' value={character.xp} onChange={(e) => handleChange('xp', parseInt(e.target.value))} />
						<InputGroup.Text style={character.xp >= character.nextLevel.xp ? { color: 'green', fontWeight: 'bold' } : {}}>
							/{character.nextLevel.xp}
						</InputGroup.Text>
						<Button variant='outline-secondary' onClick={() => handleShowLeveller(true)}>
							<FontAwesomeIcon icon={faPlusMinus} />
						</Button>
					</InputGroup>
				</Col>
			</Row>
			{character.levelNumber > 0 && (
				<Row className='mt-2'>
					<Col>
						<SelectInput
							label='Class'
							value={character.class && character.class.key}
							options={Object.keys(references.classes).map((option) => {
								return { label: references.classes[option].name, value: option };
							})}
							onChange={(value) => handleChange('class', references.classes[value])}
						/>
					</Col>
				</Row>
			)}
			<Row className='mt-2'>
				<Col>
					<TextInput label='Occupation' value={character.occupationName.value || ''} onChange={(e) => handleChange('occupationName.value', e.target.value)} />
				</Col>
			</Row>
			<Row className='mt-2'>
				<Col>
					<TextInput label='Title' value={character.title.value || ''} onChange={(e) => handleChange('title.values.value', e.target.value)} />
				</Col>
			</Row>
			<Row className='mt-2'>
				<Col>
					<InputGroup>
						<TextInput label='Speed' type='text' value={character.speed.value || ''} onChange={(e) => handleChange('speed.value', parseInt(e.target.value))} />
						<InputGroup.Text>ft</InputGroup.Text>
					</InputGroup>
				</Col>
			</Row>
			<Row className='mt-2'>
				<Col>
					<SelectInput
						label='Languages'
						isMulti={true}
						value={
							character.languages &&
							Object.keys(stripRefs(character.languages)).map((languageKey) => {
								return character.languages[languageKey].key;
							})
						}
						options={Object.keys(references.languages).map((option) => {
							return { label: references.languages[option].name, value: option };
						})}
						onChange={(value) => {
							let values = value.map((language) => {
								return { ref: { propertyPath: ['languages', language] } };
							});

							handleChange('languages', values);
						}}
					/>
				</Col>
			</Row>
			<Row className='mt-2'>
				<Col>
					<DieSelector label='Crit Die' value={character.class.critDie} onChange={(property, value) => handleChange(`critDie.class.${property}`, value)} />
				</Col>
			</Row>
			{character.class.key === 'warrior' && (
				<>
					<Row className='mt-2'>
						<Col>
							<DieSelector label='Deed Die' value={character.class.deedDie} onChange={(property, value) => handleChange(`class.deedDie.${property}`, value)} />
						</Col>
					</Row>
					<Row className='mt-2'>
						<Col>
							<TextInput
								label='Critical Hit Range'
								value={`${character.class.criticalHitRange.min}+`}
								onChange={(e) => handleChange('class.criticalHitRange.min', e.target.value)}
							/>
						</Col>
					</Row>
					<Row className='mt-2'>
						<Col>
							<SelectInput
								label='Lucky Weapon'
								value={character.class.luckyWeapon}
								options={Object.keys(references.weapons).map((option) => {
									return { label: references.weapons[option].type, value: option };
								})}
								onChange={(value) => handleChange('class.luckyWeapon', value)}
							/>
						</Col>
					</Row>
				</>
			)}

			<Row className='mt-2'>
				<Col>
					<TextInput
						label='Crit Table'
						type='number'
						value={character.class.critTableNumber.value}
						onChange={(e) => handleChange('critTableNumber.class.value', parseInt(e.target.value))}
					/>
				</Col>
			</Row>
			<Row className='mt-2'>
				<Col>
					<DieSelector
						label='Fumble Die'
						value={character.fumbleDie[0]}
						onChange={(property, value) => handleChange(`fumbleDie.0.${property}`, value)}
					/>
				</Col>
			</Row>
			{character.characteristics && (Object.keys(character.characteristics).length > 0) && (
				<Row>
					<Col>
						<div className='form-control'>
							{Object.keys(character.characteristics)
								.map((characteristicKey, characteristicIndex) => {
									return character.characteristics[characteristicKey];
								})
								.join(', ')}
						</div>
					</Col>
				</Row>
			)}
		</div>
	);
};

export default CharacterFundamentals;
