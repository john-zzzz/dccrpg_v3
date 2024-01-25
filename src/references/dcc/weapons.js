import { dice } from '../../slices/diceSlice';
import { coinTypes } from './coinTypes';

export const weapons = {
	battleaxe: {
		key: 'battleaxe',
		type: 'Battleaxe',
		damageDie: { number: 1, die: dice.d10 },
		cost: { number: 7, coinType: coinTypes.gold },
		footNotes: 'Two-handed weapon. Characters using two-handed weapons use a d16 on initiative checks.'
	},
	blackjack: {
		key: 'blackjack',
		type: 'Blackjack',
		damageDie: { number: 2, die: dice.d6 },
		cost: { number: 2, coinType: coinTypes.gold },
		footNotes:
			'These weapons are particularly effective when used with the element of surprise. A thief who succeeds in a backstab attempt with one of these weapons uses the second damage value listed. All other classes and all other thief attacks use the first value.  Damage dealt is always subdual damage.'
	},
	blowgun: {
		key: 'blowgun',
		type: 'Blowgun',
		requiresAmmunition: true,
		ammunition: {
			0: {
				type: 'Needle',
				cost: { number: 5, coinType: coinTypes.copper },
				ranges: {
					short: { key: 'short', range: '20', damageDie: { number: 1, die: dice.d5 } },
					medium: { key: 'medium', range: '40', damageDie: { number: 1, die: dice.d5, modifier: -2 } },
					long: { key: 'long', range: '60', damageDie: { number: 1, die: dice.d4 } }
				}
			}
		},
		cost: { number: 6, coinType: coinTypes.gold }
	},
	club: {
		key: 'club',
		type: 'Club',
		damageDie: { number: 1, die: dice.d4 },
		cost: { number: 3, coinType: coinTypes.gold }
	},
	crowsbow: {
		key: 'crossbow',
		type: 'Crossbow',
		requiresAmmunition: true,
		cost: { number: 30, coinType: coinTypes.gold },
		ammunition: {
			0: {
				type: 'Quarrel',
				cost: { number: 33, coinType: coinTypes.copper },
				ranges: {
					short: { key: 'short', range: '80', damageDie: { number: 1, die: dice.d6 } },
					medium: { key: 'medium', range: '160', damageDie: { number: 1, die: dice.d6, modifier: -2 } },
					long: { key: 'long', range: '240', damageDie: { number: 1, die: dice.d5 } }
				}
			}
		}
	},
	dagger: {
		key: 'dagger',
		type: 'Dagger',
		ranges: {
			short: { key: 'short', range: '10', damageDie: { number: 1, die: dice.d4 } },
			medium: { key: 'medium', range: '20', damageDie: { number: 1, die: dice.d4, modifier: -2 } },
			long: { key: 'long', range: '30', damageDie: { number: 1, die: dice.d3 } }
		},
		cost: { number: 3, coinType: coinTypes.gold },
		footNotes:
			'These weapons are particularly effective when used with the element of surprise. A thief who succeeds in a backstab attempt with one of these weapons uses the second damage value listed. All other classes and all other thief attacks use the first value.  Characters generally purchase normal straightedged daggers, but cultists, cave-dwellers, evil priests, alien worshipers, and other menacing villains carry curvy or ceremonial daggers known as athame, kris, or tumi.  Strength modifier applies to damage with this weapon at close range only.'
	},
	dart: {
		key: 'dart',
		type: 'Dart',
		ranges: {
			short: { key: 'short', range: '20', damageDie: { number: 1, die: dice.d4 } },
			medium: { key: 'medium', range: '40', damageDie: { number: 1, die: dice.d4, modifier: -2 } },
			long: { key: 'long', range: '60', damageDie: { number: 1, die: dice.d3 } }
		},
		cost: { number: 5, coinType: coinTypes.silver },
		footNotes: 'Strength modifier applies to damage with this weapon at close range only.'
	},
	flail: {
		key: 'flail',
		type: 'Flail',
		damageDie: { number: 1, die: dice.d6 },
		cost: { number: 6, coinType: coinTypes.gold }
	},
	garrote: {
		key: 'garrote',
		type: 'Garrote',
		damageDie: { number: 3, die: dice.d4 },
		cost: { number: 2, coinType: coinTypes.gold },
		footNotes:
			'These weapons are particularly effective when used	with the element of surprise. A thief who succeeds in a backstab attempt with one of these weapons uses the second damage value listed. All other classes and all other thief attacks use the first value.'
	},
	handaxe: {
		key: 'handaxe',
		type: 'Handaxe',
		ranges: {
			short: { key: 'short', range: '10', damageDie: { number: 1, die: dice.d6 } },
			medium: { key: 'medium', range: '20', damageDie: { number: 1, die: dice.d6, modifier: -2 } },
			long: { key: 'long', range: '30', damageDie: { number: 1, die: dice.d5 } }
		},
		cost: { number: 4, coinType: coinTypes.gold }
	},
	javelin: {
		key: 'javelin',
		type: 'Javelin',
		ranges: {
			short: { key: 'short', range: '30', damageDie: { number: 1, die: dice.d6 } },
			medium: { key: 'medium', range: '60', damageDie: { number: 1, die: dice.d6, modifier: -2 } },
			long: { key: 'long', range: '90', damageDie: { number: 1, die: dice.d5 } }
		},
		cost: { number: 1, coinType: coinTypes.gold }
	},
	lance: {
		key: 'lance',
		type: 'Lance',
		damageDie: { number: 1, die: dice.d12 },
		cost: { number: 25, coinType: coinTypes.gold },
		footNotes: 'These weapons inflict double damage on a mounted charge. A lance can only be used when mounted'
	},
	longbow: {
		key: 'longbow',
		type: 'Longbow',
		requiresAmmunition: true,
		cost: { number: 40, coinType: coinTypes.gold },
		footNotes: 'Two-handed weapon. Characters using two-handed weapons use a d16 on initiative checks.',
		ammunition: {
			0: {
				type: 'Arrow',
				damageDie: { number: 1, die: dice.d6 },
				cost: { number: 25, coinType: coinTypes.copper },
				ranges: {
					short: { key: 'short', range: '70', damageDie: { number: 1, die: dice.d6 } },
					medium: { key: 'medium', range: '140', damageDie: { number: 1, die: dice.d6, modifier: -2 } },
					long: { key: 'long', range: '210', damageDie: { number: 1, die: dice.d5 } }
				}
			}
		}
	},
	longsword: {
		key: 'longsword',
		type: 'Longsword',
		damageDie: { number: 1, die: dice.d8 },
		cost: { number: 10, coinType: coinTypes.gold }
	},
	mace: {
		key: 'mace',
		type: 'Mace',
		damageDie: { number: 1, die: dice.d6 },
		cost: { number: 5, coinType: coinTypes.gold }
	},
	polearm: {
		key: 'polearm',
		type: 'Polearm',
		damageDie: { number: 1, die: dice.d10 },
		cost: { number: 7, coinType: coinTypes.gold },
		footNotes: 'Two-handed weapon. Characters using two-handed weapons use a d16 on initiative checks.'
	},
	shortbow: {
		key: 'shortbow',
		type: 'Shortbow',
		requiresAmmunition: true,
		cost: { number: 25, coinType: coinTypes.gold },
		footNotes: 'Two-handed weapon. Characters using two-handed weapons use a d16 on initiative checks.',
		ammunition: {
			0: {
				type: 'Arrow',
				damageDie: { number: 1, die: dice.d6 },
				cost: { number: 25, coinType: coinTypes.copper },
				ranges: {
					short: { key: 'short', range: '50', damageDie: { number: 1, die: dice.d6 } },
					medium: { key: 'medium', range: '100', damageDie: { number: 1, die: dice.d6, modifier: -2 } },
					long: { key: 'long', range: '150', damageDie: { number: 1, die: dice.d5 } }
				}
			}
		}
	},
	shortsword: {
		key: 'shortsword',
		type: 'Short Sword',
		damageDie: { number: 1, die: dice.d6 },
		cost: { number: 7, coinType: coinTypes.gold }
	},
	sling: {
		key: 'sling',
		type: 'Sling',
		requiresAmmunition: true,
		cost: { number: 2, coinType: coinTypes.gold },
		footNotes:
			'These weapons are particularly effective when used	with the element of surprise. A thief who succeeds in a backstab attempt with one of these weapons uses the second damage value listed. All other classes and all other thief attacks use the first value.',
		ammunition: {
			0: {
				type: 'Sling Stone',
				damageDie: { number: 1, die: dice.d4 },
				cost: { number: 3, coinType: coinTypes.copper },
				ranges: {
					short: { key: 'short', range: '40', damageDie: { number: 1, die: dice.d4 } },
					medium: { key: 'medium', range: '80', damageDie: { number: 1, die: dice.d4, modifier: -2 } },
					long: { key: 'long', range: '160', damageDie: { number: 1, die: dice.d3 } }
				}
			}
		}
	},
	spear: {
		key: 'spear',
		type: 'Spear',
		damageDie: { number: 1, die: dice.d8 },
		cost: { number: 3, coinType: coinTypes.gold },
		footNotes: ' These weapons inflict double damage on a mounted charge. A lance can only be used when mounted.'
	},
	staff: {
		key: 'staff',
		type: 'Staff',
		damageDie: { number: 1, die: dice.d4 },
		cost: { number: 4, coinType: coinTypes.silver }
	},
	twohandedsword: {
		key: 'twohandedsword',
		type: 'Two Handed Sword',
		damageDie: { number: 1, die: dice.d10 },
		cost: { number: 15, coinType: coinTypes.gold },
		footNotes: 'Two-handed weapon. Characters using two-handed weapons use a d16 on initiative checks.'
	},
	warhammer: {
		key: 'warhammer',
		type: 'Warhammer',
		damageDie: { number: 1, die: dice.d8 },
		cost: { number: 5, coinType: coinTypes.gold }
	}
};
