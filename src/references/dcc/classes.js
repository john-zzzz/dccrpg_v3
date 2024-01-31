import { dice } from '../../slices/diceSlice';
export const classLevels = {
	none: {
		0: {
			key: 0,
			actionDice: { die1: { number: 1, die: dice.d20 } },
			critDie: { number: 1, die: dice.d20 },
			critTableNumber: 1
		}
	},

	warrior: {
		1: {
			key: 1,
			critDie: { number: 1, die: dice.d12 },
			critTableNumber: 3,
			reflexModifier: 1,
			fortitudeModifier: 1,
			willPowerModifier: 0,
			title: { lawful: 'Squire', chaotic: 'Bandit', neutral: 'Wildling' },
			deedDie: { number: 1, die: dice.d3, ranges: [{ min: 3, name: 'Success', variant: 'success' }] },
			criticalHitRange: { min: 19 },
			//TODO: ranges should have dice refs associated so critical hits and fumbles happen
			actionDice: {
				die1: {
					number: 1,
					die: dice.d20,
					ranges: [
						{ min: { clone: { propertyPath: 'class.criticalHitRange.min' } }, name: 'Critical Hit!', variant: 'success' },
						{ max: 15, name: 'Fumble!', variant: 'failure'}
					]
				}
			}
		},
		2: {
			key: 2,
			critDie: { number: 1, die: dice.d14 },
			critTableNumber: 3,
			reflexModifier: 1,
			fortitudeModifier: 1,
			willPowerModifier: 0,
			title: { lawful: 'Champion', chaotic: 'Brigand', neutral: 'Barbarian' },
			deedDie: { number: 1, die: dice.d4, ranges: [{ min: 3, variant: 'success' }] },
			criticalHitRange: { min: 19 },
			actionDice: { die1: { number: 1, die: dice.d20 } }
		},
		3: {
			key: 3,
			critDie: { number: 1, die: dice.d16 },
			critTableNumber: 4,
			reflexModifier: 1,
			fortitudeModifier: 2,
			willPowerModifier: 1,
			title: { lawful: 'Knight', chaotic: 'Maurauder', neutral: 'Berserker' },
			deedDie: { number: 1, die: dice.d5, ranges: [{ min: 3, variant: 'success' }] },
			criticalHitRange: { min: 19 },
			actionDice: { die1: { number: 1, die: dice.d20 } }
		},
		4: {
			key: 4,
			critDie: { number: 1, die: dice.d20 },
			critTableNumber: 4,
			reflexModifier: 2,
			fortitudeModifier: 2,
			willPowerModifier: 1,
			title: { lawful: 'Cavalier', chaotic: 'Ravager', neutral: 'Headman' },
			deedDie: { number: 1, die: dice.d6, ranges: [{ min: 3, variant: 'success' }] },
			criticalHitRange: { min: 19 },
			actionDice: { die1: { number: 1, die: dice.d20 } }
		},
		5: {
			key: 5,
			critDie: { number: 1, die: dice.d24 },
			critTableNumber: 5,
			reflexModifier: 2,
			fortitudeModifier: 3,
			willPowerModifier: 1,
			title: { lawful: 'Paladin', chaotic: 'Reaver', neutral: 'Chieftan' },
			deedDie: { number: 1, die: dice.d7, ranges: [{ min: 3, variant: 'success' }] },
			criticalHitRange: { min: 19 },
			actionDice: { die1: { number: 1, die: dice.d20 }, die2: { number: 1, die: dice.d14 } }
		},
		6: {
			key: 6,
			critDie: { number: 1, die: dice.d30 },
			critTableNumber: 5,
			reflexModifier: 2,
			fortitudeModifier: 4,
			willPowerModifier: 2,
			deedDie: { number: 1, die: dice.d8, ranges: [{ min: 3, variant: 'success' }] },
			criticalHitRange: { min: 18 },
			actionDice: { die1: { number: 1, die: dice.d20 }, die2: { number: 1, die: dice.d16 } }
		},
		7: {
			key: 7,
			critDie: { number: 1, die: dice.d30 },
			critTableNumber: 5,
			reflexModifier: 3,
			fortitudeModifier: 4,
			willPowerModifier: 2,
			deedDie: { number: 1, die: dice.d10, modifier: 1, ranges: [{ min: 3, variant: 'success' }] },
			criticalHitRange: { min: 18 },
			actionDice: { die1: { number: 1, die: dice.d20 }, die2: { number: 1, die: dice.d20 } }
		},
		8: {
			key: 8,
			critDie: { number: 2, die: dice.d30 },
			critTableNumber: 5,
			reflexModifier: 3,
			fortitudeModifier: 5,
			willPowerModifier: 2,
			deedDie: { number: 1, die: dice.d10, modifier: 2, ranges: [{ min: 3, variant: 'success' }] },
			criticalHitRange: { min: 18 },

			actionDice: { die1: { number: 1, die: dice.d20 }, die2: { number: 1, die: dice.d20 } }
		},
		9: {
			key: 9,
			critDie: { number: 2, die: dice.d30 },
			critTableNumber: 5,
			reflexModifier: 3,
			fortitudeModifier: 5,
			willPowerModifier: 3,
			deedDie: { number: 1, die: dice.d10, modifier: 3, ranges: [{ min: 3, variant: 'success' }] },
			criticalHitRange: { min: 17 },
			actionDice: { die1: { number: 1, die: dice.d20 }, die2: { number: 1, die: dice.d20 } }
		},
		10: {
			key: 10,
			critDie: { number: 2, die: dice.d30 },
			critTableNumber: 5,
			reflexModifier: 4,
			fortitudeModifier: 6,
			willPowerModifier: 3,
			deedDie: { number: 1, die: dice.d10, modifier: 4, ranges: [{ min: 3, variant: 'success' }] },
			criticalHitRange: { min: 17 },
			actionDice: { die1: { number: 1, die: dice.d20 }, die2: { number: 1, die: dice.d20 }, die3: { number: 1, die: dice.d4 } }
		}
	}
};

export const classes = {
	none: {
		key: 'none',
		name: 'None',
		classLevel: { ref: { propertyPath: ['classLevels', 'warrior', { ref: { propertyPath: 'levelNumber' } }] } },
		critDie: { clone: { propertyPath: ['classLevels', 'none', { ref: { propertyPath: 'levelNumber' } }, 'critDie'] } },
		critTableNumber: { clone: { propertyPath: ['classLevels', 'none', { ref: { propertyPath: 'levelNumber' } }, 'critTableNumber'] } },
		actionDice: { clone: { propertyPath: ['classLevels', 'none', { ref: { propertyPath: 'levelNumber' } }, 'actionDice'] } }
	},
	warrior: {
		key: 'warrior',
		name: 'Warrior',
		hitDice: { number: 1, die: dice.d12 },
		classInititiveModifier: { ref: { propertyPath: 'levelNumber' } },
		trainedWeapons: [
			'battleaxe',
			'club',
			'crossbow',
			'dagger',
			'dart',
			'handaxe',
			'javelin',
			'longbow',
			'longsword',
			'mace',
			'polearm',
			'shortbow',
			'shortSword',
			'sling',
			'spear',
			'staff',
			'twoHandedSword',
			'warhammer'
		],
		militantOrder: '',
		luckyWeapon: '',
		classLevel: { ref: { propertyPath: ['classLevels', 'warrior', { ref: { propertyPath: 'levelNumber' } }] } },
		critDie: { clone: { propertyPath: 'class.classLevel.critDie' } },
		critTableNumber: { clone: { propertyPath: 'class.classLevel.critTableNumber' } },
		reflexModifier: { clone: { propertyPath: 'class.classLevel.reflexModifier' } },
		fortitudeModifier: { clone: { propertyPath: 'class.classLevel.fortitudeModifier' } },
		willPowerModifier: { clone: { propertyPath: 'class.classLevel.willPowerModifier' } },
		deedDie: { clone: { propertyPath: 'class.classLevel.deedDie' } },
		criticalHitRange: { clone: { propertyPath: 'class.classLevel.criticalHitRange' } },
		actionDice: { clone: { propertyPath: 'class.classLevel.actionDice' } }
	},
	cleric: { key: 'cleric', name: 'Cleric' },
	wizard: { key: 'wizard', name: 'Wizard' }
};
