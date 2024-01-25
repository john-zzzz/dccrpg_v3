import { createSlice } from '@reduxjs/toolkit';
import { getValues, setValue } from '../../objectEvaluator/evaluator';
import { rollDice, dice } from '../diceSlice';
import { dccReferences } from '../../references/dccReferences';

export const generateCharacter = () => {
	let references = dccReferences;

	//TODO: Figure out how to have clone replace the value instead of adding it to the array.

	let newCharacter = {
		id: crypto.getRandomValues(new Uint32Array(1))[0],
		startingCharacter: { clone: { propertyPath: ['startingCharacters', rollDice(dice.d4).total - 1] } },
		 inititive: { dice: { number: 1, die: dice.d20, modifier: { ref: { propertyPath: 'agility.currentModifier' } } } },
		 name: { copy: { propertyPath: ['characterNames', { ref: { propertyPath: 'raceName' } }, rollDice(dice.d20).total - 1] } }, //TODO: Look up race
		 levelNumber: '0',
		 level: { ref: { propertyPath: ['levels', { ref: { propertyPath: 'levelNumber' } }] } },
		 xp: 0,
		 nextLevel: { ref: { propertyPath: ['levels', { sum: [{ ref: { propertyPath: 'levelNumber' } }, 1] }] } },
		 alignment: { clone: { propertyPath: `alignments.${rollDice(dice.d3).total - 1}` } },
		 class: { ref: { propertyPath: 'classes.none' } },
		 title: { clone: { propertyPath: ['class', 'classLevel', 'title', { ref: { propertyPath: 'alignment.key' } }] } },
		 critTable: { clone: { propertyPath: ['critTables', { ref: { propertyPath: 'critTableNumber' } }] } },
		 fumbleTable: { ref: { propertyPath: 'fumbleTable' } },
		 raceName: { copy: { propertyPath: 'startingCharacter.race.raceName' } },
		 speed: { copy: { propertyPath: 'startingCharacter.race.speed' } },
		 languages: { copy: { propertyPath: 'startingCharacter.race.languages' } },
		 characteristics: { copy: { propertyPath: 'startingCharacter.race.characteristics' } },
		 trainedWeapons: { copy: { propertyPath: 'startingCharacter.race.trainedWeapons' } },
		 occupationName: { copy: { propertyPath: 'startingCharacter.occupation.occupationName' } },
		 weapons: { copy: { propertyPath: 'startingCharacter.occupation.weapons' } },
		 armor: { copy: { propertyPath: 'startingCharacter.occupation.armor' } },
		 equipment: { copy: { propertyPath: 'startingCharacter.occupation.equipment' } },
		 beasts: { copy: { propertyPath: 'startingCharacter.occupation.beasts' } },
		 strength: {
		 	base: rollDice({ number: 3, die: dice.d3 }).total,
		 	tempModifier: 0,
		 	modifier: { ref: { propertyPath: ['attributeModifiers', { ref: { propertyPath: 'strength.base' } }] } },
		 	currentModifier: { sum: [{ ref: { propertyPath: 'strength.modifier' } }, { ref: { propertyPath: 'strength.tempModifier' } }] }
		 },
		agility: {
			base: rollDice({ number: 3, die: dice.d3 }).total,
			tempModifier: 0,
			modifier: { ref: { propertyPath: ['attributeModifiers', { ref: { propertyPath: 'agility.base' } }] } },
			currentModifier: { sum: [{ ref: { propertyPath: 'agility.modifier' } }, { ref: { propertyPath: 'agility.tempModifier' } }] }
		},
		stamina: {
			base: rollDice({ number: 3, die: dice.d3 }).total,
			tempModifier: 0,
			modifier: { ref: { propertyPath: ['attributeModifiers', { ref: { propertyPath: 'stamina.base' } }] } },
			currentModifier: { sum: [{ ref: { propertyPath: 'stamina.modifier' } }, { ref: { propertyPath: 'stamina.tempModifier' } }] }
		},
		personality: {
			base: rollDice({ number: 3, die: dice.d3 }).total,
			tempModifier: 0,
			modifier: { ref: { propertyPath: ['attributeModifiers', { ref: { propertyPath: 'personality.base' } }] } },
			currentModifier: { sum: [{ ref: { propertyPath: 'personality.modifier' } }, { ref: { propertyPath: 'personality.tempModifier' } }] }
		},
		luck: {
			base: rollDice({ number: 3, die: dice.d3 }).total,
			tempModifier: 0,
			modifier: { copy: { propertyPath: ['attributeModifiers', { ref: { propertyPath: 'luck.base' } }] } },
			currentModifier: { sum: [{ ref: { propertyPath: 'luck.modifier' } }, { ref: { propertyPath: 'luck.tempModifier' } }] }
		},
		intelligence: {
			base: rollDice({ number: 3, die: dice.d3 }).total,
			tempModifier: 0,
			modifier: { ref: { propertyPath: ['attributeModifiers', { ref: { propertyPath: 'intelligence.base' } }] } },
			currentModifier: { sum: [{ ref: { propertyPath: 'intelligence.modifier' } }, { ref: { propertyPath: 'intelligence.tempModifier' } }] }
		},
		// armorClass: { base: { sum: [10, { ref: { propertyPath: 'agility.currentModifier' } }] }, current: { clone: { propertyPath: 'armorClass.base' } } },
		armorClass: { 
			base: { sum: [10, { ref: { propertyPath: 'agility.currentModifier' } }] }, 
			armorModifier: { ref: { propertyPath: 'armor.[].armorClassModifier' } },
			current: { clone: { propertyPath: 'armorClass.base' } } 
		},
		// TODO: hitpoints should be min 1.  With the stamina mod, they can go to 0 or below!
		hitPoints: {
			max: { sumClone: [rollDice(dice.d4).total, { ref: { propertyPath: 'stamina.currentModifier' } }] },
			current: { clone: { propertyPath: 'hitPoints.max' } }
		},
		checkModifier: 0,
		meleeAttackModifier: { clone: { propertyPath: 'strength.currentModifier' } },
		meleeDamageModifier: { clone: { propertyPath: 'strength.currentModifier' } },
		missileAttackModifier: { clone: { propertyPath: 'agility.currentModifier' } },
		missileDamageModifier: { clone: { propertyPath: 'agility.currentModifier' } },
		reflexModifier: { clone: { propertyPath: 'agility.currentModifier' } },
		fortitudeModifier: { clone: { propertyPath: 'stamina.currentModifier' } },
		willpowerModifier: { clone: { propertyPath: 'personality.currentModifier' } },
		birthAuger: { ref: { propertyPath: ['birthAugers', rollDice(dice.d30).total - 1] } }
	};
	getValues(newCharacter, references);

	return JSON.parse(JSON.stringify(newCharacter));
};

const dccCharactersSlice = createSlice({
	name: 'dccCharacters',
	initialState: [],

	reducers: {
		addCharacter: (state, action) => {
			state.push(action.payload);
		},
		removeCharacter: (state, action) => {
			state = state.filter((character) => character.id !== action.payload.id);
		},
		updateCharacter: (state, action) => {
			const characterIndex = state.findIndex((character) => character.id === action.payload.characterId);
			let character = state[characterIndex];

			let newCharacter = JSON.parse(JSON.stringify(character));
			setValue(newCharacter, action.payload.propertyPath, JSON.parse(JSON.stringify(action.payload.value)));
			getValues(newCharacter, JSON.parse(JSON.stringify(dccReferences)));

			state[characterIndex] = newCharacter;
		}
	}
});

export const { addCharacter, removeCharacter, updateCharacter } = dccCharactersSlice.actions;

export default dccCharactersSlice.reducer;
