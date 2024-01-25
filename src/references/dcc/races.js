export const races = {
	Human: {
		raceName: 'Human',
		languages: [{ref: {propertyPath: 'languages.common'}}],
		speed: 30
	},
	Dwarf: {
		raceName: 'Dwarf',
		languages: [{ref: {propertyPath: 'languages.common'}}, {ref: {propertyPath: 'languages.dwarvish'}}],
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
	Elf: {
		raceName: 'Elf',
		languages: [{ref: {propertyPath: 'languages.common'}}, {ref: {propertyPath: 'languages.elvish'}}],
		speed: 30,
		characteristics: ['Spellcasting', 'Sensitivity to iron', "Infravision 60'", 'Immune to magical sleep and paralysis', 'Observant'],
		trainedWeapons: ['Dagger', 'Javelin', 'Longbow', 'Longsword', 'Shortbow', 'Short sword', 'Staff', 'Spear', 'Two-handed sword']
	},
	Halfling: {
		raceName: 'Halfling',
		languages: [{ref: {propertyPath: 'languages.common'}}, {ref: {propertyPath: 'languages.halfling'}}],
		speed: 20,
		characteristics: ['Two weapon fighting', "Infravision 30'", 'Stealthy', 'Lucky'],
		trainedWeapons: ['Club', 'Crossbow', 'Dagger', 'Handaxe', 'Javelin', 'Shortbow', 'Short sword', 'Sling', 'Staff']
	}
};