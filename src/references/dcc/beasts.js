import { dice, rollDice } from '../dcc/../../slices/diceSlice';
import { coinTypes } from './coinTypes';

export const beasts = {
    // Pony: Init +1; Atk hoof -2 melee (1d2); AC 11; HD 1d8+2; MV 40’; Act 1d20; SV Fort +2, Ref +3, Will -1; AL N.
    pony: {
		key: 'pony',
		type: 'Pony',
		description: 'A small horse.',
		speed: 40,
		inititiveModifier: 1,
		hitPoints: {
			max: rollDice({ number: 1, die: dice.d8, modifier: 2 }).total,
			current: { _ref: 'hitPoints.max' }//TODO: It pulled this from character because it's the top 
			//level object... need a "local" propertyPath, maybe someting like: propertyPath: '.hitPoints.max' (note the ".")
		},
		actionDie: { number: 1, die: dice.d20 },
		fortitudeModifier: 2,
		reflexModifier: 3,
		willpowerModifier: -1,
		alignment: { _ref: 'alignments.neutral' } ,
		armorClass: 11,
		attacks: { hoof: { key: 'hoof', name: 'Hoof', damage: { number: 1, die: dice.d2, modifier: -2 } } },
		cost: { number: 15, coinType: coinTypes.gold }
	}
};

