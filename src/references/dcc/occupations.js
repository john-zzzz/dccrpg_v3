export const occupations = {
	alchemist: {
		key: 'alchemist',
		occupationName: 'Alchemist',
		weapons: { 0: { copy: { propertyPath: 'weapons.staff' } } },
		trainedWeapons: { 0: 'Staff' },
		equipment: { 0: { copy: { propertyPath: 'equipment.oilFlask' } } }
	},
	animalTrainer: {
		key: 'animalTrainer',
		occupationName: 'Animal Trainer',
		weapons: { 0: { copy: { propertyPath: 'weapons.club' } } },
		trainedWeapons: { 0: 'Club' },
		beasts: { 0: { copy: { propertyPath: 'beasts.pony' } } }
	},
	armorer: {
		key: 'armorer',
		occupationName: 'Armorer',
		weapons: { 0: { copy: { propertyPath: 'weapons.club', name: 'Hammer' } } },
		trainedWeapons: { 0: 'Hammer' },
		beasts: { 0: { copy: { propertyPath: 'beasts.pony' } } }
	},
	astrologer: {
		key: 'astrologer',
		occupationName: 'Astrologer',
		weapons: { 0: { copy: { propertyPath: 'weapons.dagger' } } },
		trainedWeapons: { 0: 'weapons.dagger' },
		equipment: { 0: { copy: { propertyPath: 'equipment.spyglass' } } }
	},
	dwarvenApothecarist: {
		key: 'dwarvenApothecarist',
		occupationName: 'Dwarven Apothecarist',
		weapons: { 0: { copy: { propertyPath: 'weapons.staff', name: 'Cudgel' } } },
		trainedWeapons: { 0: 'weapons.staff' },
		equipment: { 0: { copy: { propertyPath: 'equipment.spyglass' } } }
	},
};
