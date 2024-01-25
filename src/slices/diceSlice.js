import { createSlice } from '@reduxjs/toolkit';

export const dice = {
	d2: 2,
	d3: 3,
	d4: 4,
	d5: 5,
	d6: 6,
	d7: 7,
	d8: 8,
	d10: 10,
	d12: 12,
	d14: 14,
	d16: 16,
	d20: 20,
	d24: 24,
	d30: 30,
	d100: 100
};

export const rollDice = (dice, name) => {
	let result = { dice: [], total: 0, name: name };
	if (!Array.isArray(dice)) dice = [dice];

	dice = dice.forEach((die) => {
		if (typeof die === 'number') {
			die = { die: die };
		}

		die = {
			number: 1,
			rolls: [],
			total: 0,
			...die
		};

		for (let dieNumber = 0; dieNumber < die.number; dieNumber++) {
			let rollResult = Math.floor(Math.random() * die.die + 1);
			die.rolls.push(rollResult);
			die.total += rollResult;
		}

		die.modifier && (die.total += die.modifier);

		die.ranges &&
			die.ranges.forEach((range) => {
				if (die.total >= range.min && die.total <= range.max) range.result = range.variant;
			});

		result.total += die.total;

		result.dice.push(die);
	});

	return result;
};

export const formatDieResult = (die) => {
	let diceCopy = JSON.parse(JSON.stringify(die));
		diceCopy.modifier = (die.modifier && die.modifier.value) || die.modifier;

	let result = '';
	result += `${diceCopy.number}d${diceCopy.die}`;
	if (!isNaN(diceCopy.modifier) && diceCopy.modifier !== 0) result += `${diceCopy.modifier > -1 ? '+' : ''}${diceCopy.modifier}`;
	if (diceCopy.rolls) {
		result += '=' + die.rolls.join('+');
		if (!isNaN(diceCopy.modifier) && diceCopy.modifier !== 0) result += `${diceCopy.modifier > -1 ? '+' : ''}${diceCopy.modifier}`;
	}
	return result;
};

const diceSlice = createSlice({
	name: 'dice',
	initialState: {
		history: [],
		currentRoll: undefined
	},
	reducers: {
		addDiceRoll: (state, action) => {
			//TODO: this shouldn't roll the dice, it should just add the dice to the history.
			let dice = action.payload.dice;
			let name = action.payload.name;
			// let result = rollDice(dice, name);
			state.currentRoll && state.history.push(state.currentRoll);
			state.currentRoll = action.payload;
		}
	}
});

export const { addDiceRoll } = diceSlice.actions;

export default diceSlice.reducer;
