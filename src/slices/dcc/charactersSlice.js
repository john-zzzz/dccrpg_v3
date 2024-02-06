import { createSlice } from '@reduxjs/toolkit';
import { rollDice, dice } from '../diceSlice';
import { dccReferences } from '../../references/dccReferences';
import { deepCopy, evaluate, setValue } from '../../objectEvaluator/evaluator2';

export const generateCharacter = (race) => {
	let references = dccReferences;
	let startingCharacterNumber = Math.floor(Math.random() * 100);

	if (race === 'human') {
		startingCharacterNumber = 0 + Math.floor(Math.random() * 69);
	} else if (race === 'dwarf') {
		startingCharacterNumber = 70 + Math.floor(Math.random() * 11);
	} else if (race === 'elf') {
		startingCharacterNumber = 81 +Math.floor(Math.random() * 10);
	} else if (race === 'halfling') {
		startingCharacterNumber = 91 + Math.floor(Math.random() * 10);
	}

	let characterModel = {
		startingCharacter: { _ref: ['startingCharacters', startingCharacterNumber] },
		race: { _ref: 'startingCharacter.race' },
		occupation: { _ref: 'startingCharacter.occupation' },
		strength: {
			base: rollDice({ number: 3, die: dice.d3 }).total,
			tempModifier: 0,
			modifier: { _ref: ['attributeModifiers', { _ref: 'strength.base' }] },
			currentModifier: { _sum: [{ _ref: 'strength.modifier' }, { _ref: 'strength.tempModifier' }] }
		},
		agility: {
			startingRoll: rollDice({ number: 3, die: dice.d3 }).total,
			// TODO: _min should have a first if the race doesn't have a minAgility
			base: { _ref: 'startingRoll', _min: { _ref: 'race.minAgility' } },
			tempModifier: 0,
			modifier: { _ref: ['attributeModifiers', { _ref: 'agility.base' }] },
			currentModifier: { _sum: [{ _ref: 'agility.modifier' }, { _ref: 'agility.tempModifier' }] }
		},
		stamina: {
			base: rollDice({ number: 3, die: dice.d3 }).total,
			tempModifier: 0,
			modifier: { _ref: ['attributeModifiers', { _ref: 'stamina.base' }] },
			currentModifier: { _sum: [{ _ref: 'stamina.modifier' }, { _ref: 'stamina.tempModifier' }] }
		},
		personality: {
			base: rollDice({ number: 3, die: dice.d3 }).total,
			tempModifier: 0,
			modifier: { _ref: ['attributeModifiers', { _ref: 'personality.base' }] },
			currentModifier: { _sum: [{ _ref: 'personality.modifier' }, { _ref: 'personality.tempModifier' }] }
		},
		luck: {
			base: rollDice({ number: 3, die: dice.d3 }).total,
			tempModifier: 0,
			modifier: { _ref: ['attributeModifiers', { _ref: 'luck.base' }] },
			currentModifier: { _sum: [{ _ref: 'luck.modifier' }, { _ref: 'luck.tempModifier' }] }
		},
		intelligence: {
			base: rollDice({ number: 3, die: dice.d3 }).total,
			tempModifier: 0,
			modifier: { _ref: ['attributeModifiers', { _ref: 'intelligence.base' }] },
			currentModifier: { _sum: [{ _ref: 'intelligence.modifier' }, { _ref: 'intelligence.tempModifier' }] }
		},

		inititive: { dice: { number: 1, die: dice.d20, modifier: { _ref: 'agility.currentModifier' } } },
		name: { _ref: ['characterNames', { _ref: 'race.key' }, rollDice(dice.d20).total - 1] },
		level: { _ref: ['levels', 0], _resetAttributes: true },
		xp: 0,
		nextLevel: { _ref: ['levels', { _sum: [{ _ref: 'level.key' }, 1] }] },
		alignment: { _ref: ['alignments', rollDice(dice.d3).total - 1] },
		class: { _ref: 'classes.none' },
		title: { _ref: ['class', 'classLevel', 'title', { _ref: 'alignment.key' }] },
		speed: { _sum: [{ _ref: 'armor.[equipped=true].speedModifier' }, { _ref: 'startingCharacter.race.speed' }] },
		languages: { _ref: 'race.languages' },
		characteristics: { _ref: 'race.characteristics' },
		trainedWeapons: { _ref: 'race.trainedWeapons' },
		occupationName: { _ref: 'occupation.occupationName' },
		weapons: { _ref: 'occupation.weapons' },
		spells: {},
		armor: { _ref: 'occupation.armor' },
		equipment: { _ref: 'occupation.equipment' },
		beasts: { _ref: 'occupation.beasts' },
		armorClass: {
			base: { _sum: [10, { _ref: 'agility.currentModifier' }] },
			armorModifier: { _sum: [{ _ref: 'armor.[].armorClassModifier' }] },
			current: { _sum: [{ _ref: 'armorClass.base' }, { _ref: 'armorClass.armorModifier' }] }
		},
		hitPoints: {
			base: rollDice({ number: 1, die: dice.d4 }).total,
			max: { _sum: [{ _ref: 'hitPoints.base' }, { _ref: 'stamina.currentModifier' }], _min: 1 },
			current: { _ref: 'hitPoints.max', _max: { _ref: 'hitPoints.max' } }
		},
		//TODO: figure out _first on the the _ref.
		fumbleDie: { _first: [{ _first: { _ref: 'armor.[equipped=true].fumbleDie' } }, { number: 1, die: dice.d4 }] },
		checkModifier: { _sum: [{ _ref: 'armor.[equipped=true].checkModifier' }] },
		meleeAttackModifier: { _ref: 'strength.currentModifier' },
		meleeDamageModifier: { _ref: 'strength.currentModifier' },
		missileAttackModifier: { _ref: 'agility.currentModifier' },
		missileDamageModifier: { _ref: 'agility.currentModifier' },
		reflexModifier: { _ref: 'agility.currentModifier' },
		fortitudeModifier: { _ref: 'stamina.currentModifier' },
		willpowerModifier: { _ref: 'personality.currentModifier' },
		birthAuger: { _ref: ['birthAugers', rollDice(dice.d30).total - 1] },
		// id: (crypto !== undefined) ? crypto.getRandomValues(new Uint32Array(1))[0] : 0 //TODO: This is a hack because "crypto" is only defined in the browser.  It'll fail JEST tests.
		id: Math.floor(Math.random() * 1000000)
	};
	let character = evaluate(deepCopy(characterModel), deepCopy(references));
	return { id: characterModel.id, model: characterModel, character: character };
};

const saveCharacters = (characters) => {
	localStorage.setItem('characters', JSON.stringify(characters));
};

const loadCharacters = () => {
	let storedCharacters = localStorage.getItem('characters') || '[]';
	return JSON.parse(storedCharacters);
};

const dccCharactersSlice = createSlice({
	name: 'dccCharacters',
	initialState: () => {
		return loadCharacters();
	},

	reducers: {
		addCharacter: (state, action) => {
			state.push(action.payload);
			saveCharacters(state);
		},
		removeCharacter: (state, action) => {
			state = state.filter((character) => character.id !== action.payload.id);
			saveCharacters(state);
		},
		updateCharacter: (state, action) => {
			const characterIndex = state.findIndex((character) => character.id === action.payload.id);
			let newCharacter = evaluate(deepCopy(action.payload), JSON.parse(JSON.stringify(dccReferences)));
			state[characterIndex] = { id: action.payload.id, model: action.payload, character: newCharacter };
			saveCharacters(state);
		},
		updateCharacterProperty: (state, action) => {
			const characterIndex = state.findIndex((character) => character.id === action.payload.characterId);
			let character = state[characterIndex];

			let newModel = setValue(
				character.model,
				action.payload.propertyPath,
				action.payload.value ? JSON.parse(JSON.stringify(action.payload.value)) : undefined
			);
			let newCharacter = evaluate(deepCopy(newModel), deepCopy(dccReferences));

			state[characterIndex] = { id: newModel.id, model: newModel, character: newCharacter };
			saveCharacters(state);
		}
	}
});

export const { addCharacter, removeCharacter, updateCharacter, updateCharacterProperty } = dccCharactersSlice.actions;

export default dccCharactersSlice.reducer;
