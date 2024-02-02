export const races = {
	human: {
		key: 'human',
		raceName: 'Human',
		languages: [{ _ref: 'languages.common' }],
		speed: 30
	},
	dwarf: {
		key: 'dwarf',
		raceName: 'Dwarf',
		languages: [{ _ref: 'languages.common' }, { _ref: 'languages.dwarvish' }],
		speed: 20,
		characteristics: ['Shield Bash', "Infravision 60'", 'Knowledge of underground stonework', "Can smell gold and gems within 100'"],
		trainedWeapons: [
			'battleaxe',
			'club',
			'dagger',
			'gandaxe',
			'longsword',
			'mace',
			'shortSword',
			'spear',
			'twoHandedSword',
			'warhammer',
			'crossbow',
			'javelin',
			'shortbow',
			'sling'
		]
	},
	elf: {
		key: 'elf',
		raceName: 'Elf',
		languages: [{ _ref: 'languages.common' }, { _ref: 'languages.elvish' }],
		speed: 30,
		characteristics: ['Spellcasting', 'Sensitivity to iron', "Infravision 60'", 'Immune to magical sleep and paralysis', 'Observant'],
		trainedWeapons: ['Dagger', 'Javelin', 'Longbow', 'Longsword', 'Shortbow', 'Short sword', 'Staff', 'Spear', 'Two-handed sword']
	},
	halfling: {
		key: 'halfling',
		raceName: 'Halfling',
		languages: [{ _ref: 'languages.common' }, { _ref: 'languages.halfling' }],
		speed: 20,
		characteristics: ['Two weapon fighting', "Infravision 30'", 'Stealthy', 'Lucky'],
		trainedWeapons: ['Club', 'Crossbow', 'Dagger', 'Handaxe', 'Javelin', 'Shortbow', 'Short sword', 'Sling', 'Staff']
	}
};
