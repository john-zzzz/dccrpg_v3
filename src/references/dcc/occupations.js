export const occupations = {
	alchemist: {
		occupationName: 'Alchemist',
		weapons: {0: { copy: { propertyPath: 'weapons.staff' }, name: 'Staff' }},
		trainedWeapons: {0:'Staff'},
		equipment: {0:{ copy: { propertyPath: 'equipment.oilFlask' } }},
		
	},
	animalTrainer: {
		occupationName: 'Animal Trainer',
		weapons: {0: { copy: { propertyPath: 'weapons.club' } }},
		trainedWeapons: {0:'Club'},
		beasts: {0:{ copy: { propertyPath: 'beasts.pony' } }}
	},
	armorer: {
		occupationName: 'Armorer',
		weapons: {0: { copy: { propertyPath:  'weapons.club', name: 'Hammer' } }},
		trainedWeapons: {0:'Hammer'},
		beasts: {0:{ copy: { propertyPath: 'beasts.pony' } }}
	},
	astrologer: {
		occupationName: 'Astrologer',
		weapons: {0: { copy: { propertyPath: 'weapons.dagger' } }},
		trainedWeapons: {0: 'weapons.dagger'},
		equipment: {0: { copy: { propertyPath: 'equipment.spyglass' } }},
		
	}
};
