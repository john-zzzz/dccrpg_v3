import { dice } from '../../slices/diceSlice';
export const fumbleTable = {
	0: { text: 'You miss wildly but miraculously cause no other damage' },
	1: { text: 'Your incompetent blow makes you the laughingstock of the party but otherwise causes no damage.' },
	2: { text: 'You trip but may recover with a DC 10 Ref save; otherwise, you must spend the next round prone.' },
	3: { text: 'Your weapon comes loose in your hand. You quickly grab it, but your grip is disrupted. You take a -2 penalty on your next attack roll.' },
	4: {
		text: 'Your weapon is damaged: a bowstring breaks, a sword hilt falls off, or a crossbow firing mechanism jams. The weapon can be repaired with 10 minutes of work but is useless for now'
	},
	5: { text: 'You trip and fall, wasting this action. You are prone and must use an action to stand next round.' },
	6: {
		text: 'Your weapon becomes entangled in your armor. You must spend your next round untangling them. In addition, your armor bonus is reduced by 1 until you spend 10 minutes refitting the tangled buckles and straps.'
	},
	7: { text: 'You drop your weapon. You must retrieve it or draw a new one on your next action.' },
	8: {
		text: 'You accidentally smash your weapon against a solid, unyielding object (a rock, a wall, even the ground). Mundane weapons are ruined; magical weapons are not affected.'
	},
	9: { text: 'You stumble and leave yourself wide open to attack. The next enemy that attacks you receives a +2 bonus on its attack roll.' },
	10: {
		text: 'You should have maintained your armor! The joints of your armor seize up, freezing you in place. You cannot move or make an attack for 1d3 rounds. Unarmored characters are not affected.',
		rolls: [{ name: 'Immobile for x rounds', number: 1, die: dice.d3 }]
	},
	11: { text: 'Your wild swing leaves you off balance. You take a -4 penalty to your next attack roll' },
	12: {
		text: 'You inadvertently swing at one randomly determined ally within range. Make an attack roll against that ally using the same attack die you just attempted to use.'
	},
	13: {
		text: 'You trip badly. You fall hard, suffering 1d3 damage in the process. You are prone and must use your next round to stand.',
		rolls: [{ name: 'Additional Damage', number: 1, die: dice.d3 }]
	},
	14: {
		text: 'Like a turtle on its back, you slip and land upside down, flailing about and unable to right yourself. You must fight from a prone position for the next round before you can recover your balance and rise'
	},
	15: { text: 'You somehow manage to wound yourself, taking normal damage' },
	16: {
		text: 'You accidentally strike yourself for normal damage plus an extra 1 point. In addition, you fall on your back and are unable to right yourself until you make a DC 16 Agility check.'
	},
	17: {
		text: 'You accidentally strike yourself for normal damage plus an extra 1 point. In addition, you fall on your back and are unable to right yourself until you make a DC 16 Agility check.'
	},
	18: {
		text: 'You accidentally strike yourself for normal damage plus an extra 1 point. In addition, you fall on your back and are unable to right yourself until you make a DC 16 Agility check.'
	},
	19: {
		text: 'You accidentally strike yourself for normal damage plus an extra 1 point. In addition, you fall on your back and are unable to right yourself until you make a DC 16 Agility check.'
	},
	20: {
		text: 'You accidentally strike yourself for normal damage plus an extra 1 point. In addition, you fall on your back and are unable to right yourself until you make a DC 16 Agility check.'
	},
	21: {
		text: 'You accidentally strike yourself for normal damage plus an extra 1 point. In addition, you fall on your back and are unable to right yourself until you make a DC 16 Agility check.'
	},
	22: {
		text: 'You accidentally strike yourself for normal damage plus an extra 1 point. In addition, you fall on your back and are unable to right yourself until you make a DC 16 Agility check.'
	},
	23: {
		text: 'You accidentally strike yourself for normal damage plus an extra 1 point. In addition, you fall on your back and are unable to right yourself until you make a DC 16 Agility check.'
	},
	24: {
		text: 'You accidentally strike yourself for normal damage plus an extra 1 point. In addition, you fall on your back and are unable to right yourself until you make a DC 16 Agility check.'
	},
	25: {
		text: 'You accidentally strike yourself for normal damage plus an extra 1 point. In addition, you fall on your back and are unable to right yourself until you make a DC 16 Agility check.'
	}
};
