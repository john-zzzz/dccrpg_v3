import { dice } from "../../slices/diceSlice";
import { coinTypes } from "./coinTypes";

export const spells = {
	ekimMysticalMask: {
        key: 'ekimMysticalMask',
		name: 'Ekim\'s Mystical Mask',
		level: 1,
		manualPage: 141, //Note: Add 4 pages to navigation for title pages, so 137 => http://localhost:3000/static/media/Full%20Manual.pdf#page=141
		range: 'Self',
		duration: { unit: timeUnits.round, value: { token: 'level' } },
		castingTime: { unit: timeUnits.action, value: 1 },
		castingDie: { number: 1, die: { token: 'castingDie.die' } },
		general:
			'The caster conjures a mystical mask that covers his face and provides benefits against attacks, spells, and other conditions. On a successful casting, the wizard may choose to invoke an effect of lesser power than his spell check roll to produce a weaker but potentially more useful result.',
		manifestation: {
			dice: { die: dice.d4, number: 1 },
			notes:
				'In addition to these manifestations, each mask alters the caster\'s face in a different manner. These	alterations are detailed on the spell check table below. ',
			results: [
				{ roll: 1, result: 'The caster plucks the mask out of thin air.' },
				{ roll: 2, result: 'The flesh on the caster\'s face peels away to reveal the mask beneath.' },
				{
					roll: 3,
					result: 'The caster\'s head becomes momentarily blurred and the mask is in place once the distortion passes.',
				},
				{ roll: 4, result: 'The caster\'s head appears to spin 180° revealing a masked face on the back of his head.' },
			],
		},
		corruption: {
			dice: { die: dice.d4, number: 1 },
			results: [
				{ roll: 1, result: 'The caster\'s face takes on an emotionless, artificial mien.' },
				{ roll: 2, result: 'The flesh on the caster\'s face turns dry and flakes away constantly.' },
				{
					roll: 3,
					result:
						'The caster develops a phobia about revealing his true face and takes to wearing veils or hooded cloaks.',
				},
				{ roll: 4, result: 'The caster\'s nose vanishes completely, leaving his face flat and mask-like.' },
			],
		},
		misfire: {
			dice: { die: dice.d4, number: 1 },
			results: [
				{
					roll: 1,
					result:
						'Caster is blinded by the mask for 1d3 rounds and suffers a -4 penalty to initiative rolls, attack rolls, saving throws, spell checks, and to avoid being surprised',
				},
				{ roll: 2, result: 'the caster\'s mouth vanishes for 1d3 rounds and no spells may be cast during that time' },
				{
					roll: 3,
					result:
						'for the next day, the caster\'s eyes become hypersensitive to light and he suffers a -2 penalty to all attacks, saves, spell checks, ability checks, and initiative rolls when in illumination brighter than candle light',
				},
				{
					roll: 4,
					result:
						'the caster\'s face vanishes completely, rendering him blind and mute; in addition, he must make a DC 10 Fort save each round or pass out from asphyxiation; his face returns to normal once the spell\'s duration has expired',
				},
			],
		},
		results: [
			{
				roll: 1,
				result:
					'Lost, failure, and worse! Roll 1d6 modified by Luck: (0 or less) corruption + patron taint + misfire; (1-2) corruption; (3+) misfire.',
				failure: true,
				dice: {
					die: dice.d6,
					number: 1,
					//TODO: Make sure this works!
					modifier: { token: 'luckModifier' },
					result: [
						{
							roll: 0,
							corruption: true,
							patronTaint: true,
							misfire: true,
							result: 'corruption + patron taint + misfire',
						},
						{ roll: 1, corruption: true, result: 'corruption' },
						{ roll: 2, corruption: true, result: 'corruption' },
						{ roll: 3, misfire: true, result: 'misfire' },
						{ roll: 4, misfire: true, result: 'misfire' },
						{ roll: 5, misfire: true, result: 'misfire' },
						{ roll: 6, misfire: true, result: 'misfire' },
					],
				},
			},
			{ roll: 2, failure: true, result: 'Lost. Failure.' },
			{ roll: 3, failure: true, result: 'Lost. Failure.' },
			{ roll: 4, failure: true, result: 'Lost. Failure.' },
			{ roll: 5, failure: true, result: 'Lost. Failure.' },
			{ roll: 6, failure: true, result: 'Lost. Failure.' },
			{ roll: 7, failure: true, result: 'Lost. Failure.' },
			{ roll: 8, failure: true, result: 'Lost. Failure.' },
			{ roll: 9, failure: true, result: 'Lost. Failure.' },
			{ roll: 10, failure: true, result: 'Lost. Failure.' },
			{ roll: 11, failure: true, result: 'Lost. Failure.' },
			{
				roll: 12,
				result:
					'The mask grants infravision, allowing the caster to see in the dark up to 60\' away. His eyes reflect light like a cat while this mask is in effect.',
			},
			{
				roll: 13,
				result:
					'The mask grants infravision, allowing the caster to see in the dark up to 60\' away. His eyes reflect light like a cat while this mask is in effect.',
			},
			{
				roll: 14,
				result:
					'The mask helps protect the caster against gaze attacks such as that from a basilisk (q.v.). The caster enjoys a +4 bonus to saving throws of any type against gaze attacks for the duration of the spell. The caster\'s face takes on a mirror-like quality while this mask is in effect.',
			},
			{
				roll: 15,
				result:
					'The mask helps protect the caster against gaze attacks such as that from a basilisk (q.v.). The caster enjoys a +4 bonus to saving throws of any type against gaze attacks for the duration of the spell. The caster\'s face takes on a mirror-like quality while this mask is in effect.',
			},
			{
				roll: 16,
				result:
					'The mask helps protect the caster against gaze attacks such as that from a basilisk (q.v.). The caster enjoys a +4 bonus to saving throws of any type against gaze attacks for the duration of the spell. The caster\'s face takes on a mirror-like quality while this mask is in effect.',
			},
			{
				roll: 17,
				result:
					'The mask helps protect the caster against gaze attacks such as that from a basilisk (q.v.). The caster enjoys a +4 bonus to saving throws of any type against gaze attacks for the duration of the spell. The caster\'s face takes on a mirror-like quality while this mask is in effect.',
			},
			{
				roll: 18,
				result:
					'The mask helps defend the caster against baneful magical spells. All spells cast directly at the wizard suffer a -2 penalty to their spell checks. Area-of-effect spells or other magics that are not targeted directly at the mask wearer are unmodified. The caster\'s face takes on a faceted, quartz-like appearance while this mask is in effect.',
			},
			{
				roll: 19,
				result:
					'The mask helps defend the caster against baneful magical spells. All spells cast directly at the wizard suffer a -2 penalty to their spell checks. Area-of-effect spells or other magics that are not targeted directly at the mask wearer are unmodified. The caster\'s face takes on a faceted, quartz-like appearance while this mask is in effect.',
			},
			{
				roll: 20,
				result:
					'The mask transforms the caster\'s face into a horrible visage. Each round he can attempt to instill fear in one creature. The target creature must make a Will save or flee from the caster\'s location for 1d4+CL rounds. The targeted creature must be able to see the caster clearly to be affected by the gaze. The caster can attempt to affect one creature each round for the duration of the spell and can try to instill fear on the same creature more than once, requiring it to make a new saving throw with each attempt. The caster\'s face becomes monstrously demonic while this mask is in effect.',
			},
			{
				roll: 21,
				result:
					'The mask transforms the caster\'s face into a horrible visage. Each round he can attempt to instill fear in one creature. The target creature must make a Will save or flee from the caster\'s location for 1d4+CL rounds. The targeted creature must be able to see the caster clearly to be affected by the gaze. The caster can attempt to affect one creature each round for the duration of the spell and can try to instill fear on the same creature more than once, requiring it to make a new saving throw with each attempt. The caster\'s face becomes monstrously demonic while this mask is in effect.',
			},
			{
				roll: 22,
				result:
					'The mask transforms the caster\'s face into a horrible visage. Each round he can attempt to instill fear in one creature. The target creature must make a Will save or flee from the caster\'s location for 1d4+CL rounds. The targeted creature must be able to see the caster clearly to be affected by the gaze. The caster can attempt to affect one creature each round for the duration of the spell and can try to instill fear on the same creature more than once, requiring it to make a new saving throw with each attempt. The caster\'s face becomes monstrously demonic while this mask is in effect.',
			},
			{
				roll: 23,
				result:
					'The mask transforms the caster\'s face into a horrible visage. Each round he can attempt to instill fear in one creature. The target creature must make a Will save or flee from the caster\'s location for 1d4+CL rounds. The targeted creature must be able to see the caster clearly to be affected by the gaze. The caster can attempt to affect one creature each round for the duration of the spell and can try to instill fear on the same creature more than once, requiring it to make a new saving throw with each attempt. The caster\'s face becomes monstrously demonic while this mask is in effect.',
			},
			{
				roll: 24,
				result:
					'The mask protects the caster against physical attacks, granting him a +4 bonus to AC while the spell is in effect. In addition, the caster enjoys a +2 bonus to all saving throws for the duration of the spell. The caster\'s face appears encased in shining steel while this mask is in effect.',
			},
			{
				roll: 25,
				result:
					'The mask protects the caster against physical attacks, granting him a +4 bonus to AC while the spell is in effect. In addition, the caster enjoys a +2 bonus to all saving throws for the duration of the spell. The caster\'s face appears encased in shining steel while this mask is in effect.',
			},
			{
				roll: 26,
				result:
					'The mask protects the caster against physical attacks, granting him a +4 bonus to AC while the spell is in effect. In addition, the caster enjoys a +2 bonus to all saving throws for the duration of the spell. The caster\'s face appears encased in shining steel while this mask is in effect.',
			},
			{
				roll: 27,
				result:
					'The mask protects the caster against physical attacks, granting him a +4 bonus to AC while the spell is in effect. In addition, the caster enjoys a +2 bonus to all saving throws for the duration of the spell. The caster\'s face appears encased in shining steel while this mask is in effect.',
			},
			{
				roll: 28,
				result:
					'The mask reflects melee and ranged attacks back at unlucky assailants. Any attacker that successfully strikes the mask\'s wearer with a physical melee or missile attack must make a DC 10 Luck check or find their attack turned against them. The attacker\'s same attack roll (including any and all modifiers) is applied to its own AC and inflicts normal damage if the blow lands successfully. The caster\'s face appears to be that of his attacker(s) while the mask is in effect.',
			},
			{
				roll: 29,
				result:
					'The mask reflects melee and ranged attacks back at unlucky assailants. Any attacker that successfully strikes the mask\'s wearer with a physical melee or missile attack must make a DC 10 Luck check or find their attack turned against them. The attacker\'s same attack roll (including any and all modifiers) is applied to its own AC and inflicts normal damage if the blow lands successfully. The caster\'s face appears to be that of his attacker(s) while the mask is in effect.',
			},
			{
				roll: 30,
				result:
					'The mask transforms the caster\'s entire head into that of a snake. While in effect, the mask grants the caster both the illusion generating and hypnotic gaze powers of a serpent-man (see page 425). As an incidental benefit, it also allows the caster to pass himself off as a serpent-man under cursory inspection. The mask\'s effect on the caster\'s face is self-evident.',
			},
			{
				roll: 31,
				result:
					'The mask transforms the caster\'s entire head into that of a snake. While in effect, the mask grants the caster both the illusion generating and hypnotic gaze powers of a serpent-man (see page 425). As an incidental benefit, it also allows the caster to pass himself off as a serpent-man under cursory inspection. The mask\'s effect on the caster\'s face is self-evident.',
			},
			{
				roll: 32,
				result:
					'With this powerful casting, the wizard\'s face is occluded by a mask that combines all the spell\'s possible effects into a single visage. The caster has infravision up to 60\'; gains a +4 saving throw bonus against gaze attacks; harmful spells cast directly at the caster suffer a -2 penalty to spell checks; the caster can instill fear against any creature that fails a Will save, forcing it to flee for 1d4+CL rounds; the caster\'s AC is improved by +4, and all saves receive a +2 bonus (this stacks with the +4 bonus against gaze attacks); any attacker who  successfully strikes the caster with a physical melee or missile attack must make a DC 10 Luck check or possibly be struck by its own attack (compare the initial attack roll against its own AC); and the caster\'s face is transformed into a serpent\'s head, granting him the illusionary and hypnotic capabilities of a serpent-man (see page 425). At this level of success, the mask makes no alterations to the caster\'s face other than the snake\'s head transformation (which can be obscured with the illusion generation ability granted by that alteration).',
			},
			{
				roll: 33,
				result:
					'With this powerful casting, the wizard\'s face is occluded by a mask that combines all the spell\'s possible effects into a single visage. The caster has infravision up to 60\'; gains a +4 saving throw bonus against gaze attacks; harmful spells cast directly at the caster suffer a -2 penalty to spell checks; the caster can instill fear against any creature that fails a Will save, forcing it to flee for 1d4+CL rounds; the caster\'s AC is improved by +4, and all saves receive a +2 bonus (this stacks with the +4 bonus against gaze attacks); any attacker who  successfully strikes the caster with a physical melee or missile attack must make a DC 10 Luck check or possibly be struck by its own attack (compare the initial attack roll against its own AC); and the caster\'s face is transformed into a serpent\'s head, granting him the illusionary and hypnotic capabilities of a serpent-man (see page 425). At this level of success, the mask makes no alterations to the caster\'s face other than the snake\'s head transformation (which can be obscured with the illusion generation ability granted by that alteration).',
			},
			{
				roll: 34,
				result:
					'With this powerful casting, the wizard\'s face is occluded by a mask that combines all the spell\'s possible effects into a single visage. The caster has infravision up to 60\'; gains a +4 saving throw bonus against gaze attacks; harmful spells cast directly at the caster suffer a -2 penalty to spell checks; the caster can instill fear against any creature that fails a Will save, forcing it to flee for 1d4+CL rounds; the caster\'s AC is improved by +4, and all saves receive a +2 bonus (this stacks with the +4 bonus against gaze attacks); any attacker who  successfully strikes the caster with a physical melee or missile attack must make a DC 10 Luck check or possibly be struck by its own attack (compare the initial attack roll against its own AC); and the caster\'s face is transformed into a serpent\'s head, granting him the illusionary and hypnotic capabilities of a serpent-man (see page 425). At this level of success, the mask makes no alterations to the caster\'s face other than the snake\'s head transformation (which can be obscured with the illusion generation ability granted by that alteration).',
			},
			{
				roll: 35,
				result:
					'With this powerful casting, the wizard\'s face is occluded by a mask that combines all the spell\'s possible effects into a single visage. The caster has infravision up to 60\'; gains a +4 saving throw bonus against gaze attacks; harmful spells cast directly at the caster suffer a -2 penalty to spell checks; the caster can instill fear against any creature that fails a Will save, forcing it to flee for 1d4+CL rounds; the caster\'s AC is improved by +4, and all saves receive a +2 bonus (this stacks with the +4 bonus against gaze attacks); any attacker who  successfully strikes the caster with a physical melee or missile attack must make a DC 10 Luck check or possibly be struck by its own attack (compare the initial attack roll against its own AC); and the caster\'s face is transformed into a serpent\'s head, granting him the illusionary and hypnotic capabilities of a serpent-man (see page 425). At this level of success, the mask makes no alterations to the caster\'s face other than the snake\'s head transformation (which can be obscured with the illusion generation ability granted by that alteration).',
			},
			{
				roll: 36,
				result:
					'With this powerful casting, the wizard\'s face is occluded by a mask that combines all the spell\'s possible effects into a single visage. The caster has infravision up to 60\'; gains a +4 saving throw bonus against gaze attacks; harmful spells cast directly at the caster suffer a -2 penalty to spell checks; the caster can instill fear against any creature that fails a Will save, forcing it to flee for 1d4+CL rounds; the caster\'s AC is improved by +4, and all saves receive a +2 bonus (this stacks with the +4 bonus against gaze attacks); any attacker who  successfully strikes the caster with a physical melee or missile attack must make a DC 10 Luck check or possibly be struck by its own attack (compare the initial attack roll against its own AC); and the caster\'s face is transformed into a serpent\'s head, granting him the illusionary and hypnotic capabilities of a serpent-man (see page 425). At this level of success, the mask makes no alterations to the caster\'s face other than the snake\'s head transformation (which can be obscured with the illusion generation ability granted by that alteration).',
			},
			{
				roll: 37,
				result:
					'With this powerful casting, the wizard\'s face is occluded by a mask that combines all the spell\'s possible effects into a single visage. The caster has infravision up to 60\'; gains a +4 saving throw bonus against gaze attacks; harmful spells cast directly at the caster suffer a -2 penalty to spell checks; the caster can instill fear against any creature that fails a Will save, forcing it to flee for 1d4+CL rounds; the caster\'s AC is improved by +4, and all saves receive a +2 bonus (this stacks with the +4 bonus against gaze attacks); any attacker who  successfully strikes the caster with a physical melee or missile attack must make a DC 10 Luck check or possibly be struck by its own attack (compare the initial attack roll against its own AC); and the caster\'s face is transformed into a serpent\'s head, granting him the illusionary and hypnotic capabilities of a serpent-man (see page 425). At this level of success, the mask makes no alterations to the caster\'s face other than the snake\'s head transformation (which can be obscured with the illusion generation ability granted by that alteration).',
			},
			{
				roll: 38,
				result:
					'With this powerful casting, the wizard\'s face is occluded by a mask that combines all the spell\'s possible effects into a single visage. The caster has infravision up to 60\'; gains a +4 saving throw bonus against gaze attacks; harmful spells cast directly at the caster suffer a -2 penalty to spell checks; the caster can instill fear against any creature that fails a Will save, forcing it to flee for 1d4+CL rounds; the caster\'s AC is improved by +4, and all saves receive a +2 bonus (this stacks with the +4 bonus against gaze attacks); any attacker who  successfully strikes the caster with a physical melee or missile attack must make a DC 10 Luck check or possibly be struck by its own attack (compare the initial attack roll against its own AC); and the caster\'s face is transformed into a serpent\'s head, granting him the illusionary and hypnotic capabilities of a serpent-man (see page 425). At this level of success, the mask makes no alterations to the caster\'s face other than the snake\'s head transformation (which can be obscured with the illusion generation ability granted by that alteration).',
			},
			{
				roll: 39,
				result:
					'With this powerful casting, the wizard\'s face is occluded by a mask that combines all the spell\'s possible effects into a single visage. The caster has infravision up to 60\'; gains a +4 saving throw bonus against gaze attacks; harmful spells cast directly at the caster suffer a -2 penalty to spell checks; the caster can instill fear against any creature that fails a Will save, forcing it to flee for 1d4+CL rounds; the caster\'s AC is improved by +4, and all saves receive a +2 bonus (this stacks with the +4 bonus against gaze attacks); any attacker who  successfully strikes the caster with a physical melee or missile attack must make a DC 10 Luck check or possibly be struck by its own attack (compare the initial attack roll against its own AC); and the caster\'s face is transformed into a serpent\'s head, granting him the illusionary and hypnotic capabilities of a serpent-man (see page 425). At this level of success, the mask makes no alterations to the caster\'s face other than the snake\'s head transformation (which can be obscured with the illusion generation ability granted by that alteration).',
			},
			{
				roll: 40,
				result:
					'With this powerful casting, the wizard\'s face is occluded by a mask that combines all the spell\'s possible effects into a single visage. The caster has infravision up to 60\'; gains a +4 saving throw bonus against gaze attacks; harmful spells cast directly at the caster suffer a -2 penalty to spell checks; the caster can instill fear against any creature that fails a Will save, forcing it to flee for 1d4+CL rounds; the caster\'s AC is improved by +4, and all saves receive a +2 bonus (this stacks with the +4 bonus against gaze attacks); any attacker who  successfully strikes the caster with a physical melee or missile attack must make a DC 10 Luck check or possibly be struck by its own attack (compare the initial attack roll against its own AC); and the caster\'s face is transformed into a serpent\'s head, granting him the illusionary and hypnotic capabilities of a serpent-man (see page 425). At this level of success, the mask makes no alterations to the caster\'s face other than the snake\'s head transformation (which can be obscured with the illusion generation ability granted by that alteration).',
			},
		],
	},
	spiderClimb:{
        key: 'spiderClimb',
		name: 'Spider Climb',
		level: 1,
		manualPage: 160, //Note: Add 4 pages to navigation for title pages, so 137 => http://localhost:3000/static/media/Full%20Manual.pdf#page=141
		range: 'Self or touch',
		duration: { unit: timeUnits.round, value: { token: 'level' } },
		castingTime: { unit: timeUnits.action, value: 1 },
		castingDie: { number: 1, die: { token: 'castingDie.die' } },
		general: 'The caster gains the spider\'s ability to climb vertical surfaces.',
		manifestation: {
			dice: { die: dice.d4, number: 1 },
			results: [
				{ roll: 1, result: 'Four extra spider-like limbs sprout from the caster\'s torso.' },
				{ roll: 2, result: 'The caster\'s hands and feet ooze sticky goo.' },
				{ roll: 3,result: 'The caster\'s fingers and toes glow with a strange orange light.'},
				{ roll: 4, result: 'The caster grow six additional eyes.' },
			],
		},
		corruption: {
			dice: { die: dice.d6, number: 1 },
			results: [
				{ roll: 1, result: 'Caster grows four large spider-like limbs from his back.' },
				{ roll: 2, result: 'Caster can spin small webs like a spider and throw them up to 30\' as a sticky goo (ranged attack roll, DC 12 Strength or Agility check for target to escape).' },
				{ roll: 3, result: 'Caster grows short, spindly hairs across the surface of his skin, much like a spider.' },
				{ roll: 4, result: 'Caster grows six extra eyes, clustered around his normal eyes, so they resemble a spider\'s.'},
				{ roll: 5, result: 'Caster\'s hands and feet excrete an oily, sticky substance that causes small objects to stick to them.' },
				{ roll: 6, result: 'Minor.' },
			],
		},
		misfire: {
			dice: { die: dice.d5, number: 1 },
			results: [
				{
					roll: 1,
					result:
						'Caster sticks himself to the floor and cannot move his feet until he makes a DC 16 Strength check.',
				},
				{ roll: 2, result: 'Caster makes his appendages magically slippery and has trouble standing straight for the next 1d6 rounds, falling over constantly unless he makes a DC 12 Agility check each round.' },
				{
					roll: 3,
					result:
						'Caster launches a glob of webby fibers at nearest ally, entangling his companion until the ally makes a DC 12 Strength or Agility check to escape.',
				},
				{
					roll: 4,
					result:
						'Caster summons a horde of poisonous spiders, which arrives one round later and swarm across all nearby creatures, inflicting scores of bites and forcing a DC 8 Fort save by all creatures within 50\' with failure indicating a mild poison (1 hp damage plus -1 penalty to all rolls for 1 hour).',
				},
				{
					roll: 5,
					result:
						'Caster plus 1d4 nearby creatures are flipped upside down in mid-air, with their feet adhering	to a point in the air about 8\' above ground level, and although they are able to move about as normal in this upside-down station they remain upside down for 1d6 hours.',
				},
			],
		},
		results: [
			{
				roll: 1,
				result:
					'Lost, failure, and worse! Roll 1d6 modified by Luck: (0 or less) corruption + misfire; (1-2) corruption; (3+) misfire.',
				failure: true,
				dice: {
					die: dice.d6,
					number: 1,
					//TODO: Make this work!
					// modifier: { token: 'luckModifier' },
					result: [
						{
							roll: 0,
							corruption: true,
							misfire: true,
							result: 'corruption + misfire',
						},
						{ roll: 1, corruption: true, result: 'corruption' },
						{ roll: 2, corruption: true, result: 'corruption' },
						{ roll: 3, misfire: true, result: 'misfire' },
						{ roll: 4, misfire: true, result: 'misfire' },
						{ roll: 5, misfire: true, result: 'misfire' },
						{ roll: 6, misfire: true, result: 'misfire' },
					],
				},
			},
			{ roll: 2, failure: true, result: 'Lost. Failure.' },
			{ roll: 3, failure: true, result: 'Lost. Failure.' },
			{ roll: 4, failure: true, result: 'Lost. Failure.' },
			{ roll: 5, failure: true, result: 'Lost. Failure.' },
			{ roll: 6, failure: true, result: 'Lost. Failure.' },
			{ roll: 7, failure: true, result: 'Lost. Failure.' },
			{ roll: 8, failure: true, result: 'Lost. Failure.' },
			{ roll: 9, failure: true, result: 'Lost. Failure.' },
			{ roll: 10, failure: true, result: 'Lost. Failure.' },
			{ roll: 11, failure: true, result: 'Lost. Failure.' },
			{
				roll: 12,
				result:
					'The caster becomes much more skilled at climbing, gaining a +10 bonus to Climb checks as long as his	hands and feet are bare. Items weighing less than 5 lbs. stick to the casters hands during this time, making spellcasting impossible for the duration.',
			},
			{
				roll: 13,
				result:
					'The caster becomes much more skilled at climbing, gaining a +10 bonus to Climb checks as long as his	hands and feet are bare. Items weighing less than 5 lbs. stick to the casters hands during this time, making spellcasting impossible for the duration.',
			},
			{
				roll: 14,
				result:
					'The caster becomes extremely skilled at climbing, gaining a +20 bonus to Climb checks as long as his	hands and feet are bare. Items weighing less than 5 lbs. stick to the caster\'s hands during this time, making spellcasting impossible for the duration.',
			},
			{
				roll: 15,
				result:
					'The caster becomes extremely skilled at climbing, gaining a +20 bonus to Climb checks as long as his	hands and feet are bare. Items weighing less than 5 lbs. stick to the caster\'s hands during this time, making spellcasting impossible for the duration.',
			},
			{
				roll: 16,
				result:
					'The caster becomes extremely skilled at climbing, gaining a +20 bonus to Climb checks as long as his	hands and feet are bare. Items weighing less than 5 lbs. stick to the caster\'s hands during this time, making spellcasting impossible for the duration.',
			},
			{
				roll: 17,
				result:
					'The caster becomes extremely skilled at climbing, gaining a +20 bonus to Climb checks as long as his	hands and feet are bare. Items weighing less than 5 lbs. stick to the caster\'s hands during this time, making spellcasting impossible for the duration.',
			},
			{
				roll: 18,
				result:
					'The caster gains the actual climbing ability of a spider as long as his hands and feet are bare. He can hang upside down, climb completely vertical surfaces with no handholds, move across spider webs, and even scurry along upside down at obtuse angles. The caster moves at his normal speed and need never make Climb checks. He is immune to spider web spells. The caster\'s hands and feet must remain bare, and items weighing less than 5 lbs. stick to his hands during this time, making spellcasting impossible for the duration.',
			},
			{
				roll: 19,
				result:
					'The caster gains the actual climbing ability of a spider as long as his hands and feet are bare. He can hang upside down, climb completely vertical surfaces with no handholds, move across spider webs, and even scurry along upside down at obtuse angles. The caster moves at his normal speed and need never make Climb checks. He is immune to spider web spells. The caster\'s hands and feet must remain bare, and items weighing less than 5 lbs. stick to his hands during this time, making spellcasting impossible for the duration.',
			},
			{
				roll: 20,
				result:
					'The caster gains the actual climbing ability of a spider, even when using gloves and shoes, and when carrying objects in his hands. He can hang upside down, climb completely vertical surfaces with no handholds, move across spider webs, and even scurry along upside down at obtuse angles. The caster moves at his normal speed, need never make Climb checks, and is immune to spider web spells.',
			},
			{
				roll: 21,
				result:
					'The caster gains the actual climbing ability of a spider, even when using gloves and shoes, and when carrying objects in his hands. He can hang upside down, climb completely vertical surfaces with no handholds, move across spider webs, and even scurry along upside down at obtuse angles. The caster moves at his normal speed, need never make Climb checks, and is immune to spider web spells.',
			},
			{
				roll: 22,
				result:
					'The caster gains the actual climbing ability of a spider, even when using gloves and shoes, and when carrying objects in his hands. He can hang upside down, climb completely vertical surfaces with no handholds, move across spider webs, and even scurry along upside down at obtuse angles. The caster moves at his normal speed, need never make Climb checks, and is immune to spider web spells.',
			},
			{
				roll: 23,
				result:
					'The caster gains the actual climbing ability of a spider, even when using gloves and shoes, and when carrying objects in his hands. He can hang upside down, climb completely vertical surfaces with no handholds, move across spider webs, and even scurry along upside down at obtuse angles. The caster moves at his normal speed, need never make Climb checks, and is immune to spider web spells.',
			},
			{
				roll: 24,
				result:
					'The caster and one ally touched gain the actual climbing ability of a spider, even when using gloves and shoes, and when carrying objects in hand. The caster and his ally can hang upside down, climb completely vertical surfaces with no handholds, move across spider webs, and even scurry along upside down at obtuse angles. The caster and his affected ally move at their normal speeds, need never make Climb checks, and are immune to spider web spells.',
			},
			{
				roll: 25,
				result:
					'The caster and one ally touched gain the actual climbing ability of a spider, even when using gloves and shoes, and when carrying objects in hand. The caster and his ally can hang upside down, climb completely vertical surfaces with no handholds, move across spider webs, and even scurry along upside down at obtuse angles. The caster and his affected ally move at their normal speeds, need never make Climb checks, and are immune to spider web spells.',
			},
			{
				roll: 26,
				result:
					'The caster and one ally touched gain the actual climbing ability of a spider, even when using gloves and shoes, and when carrying objects in hand. The caster and his ally can hang upside down, climb completely vertical surfaces with no handholds, move across spider webs, and even scurry along upside down at obtuse angles. The caster and his affected ally move at their normal speeds, need never make Climb checks, and are immune to spider web spells.',
			},
			{
				roll: 27,
				result:
					'The caster and one ally touched gain the actual climbing ability of a spider, even when using gloves and shoes, and when carrying objects in hand. The caster and his ally can hang upside down, climb completely vertical surfaces with no handholds, move across spider webs, and even scurry along upside down at obtuse angles. The caster and his affected ally move at their normal speeds, need never make Climb checks, and are immune to spider web spells.',
			},
			{
				roll: 28,
				result:
					'The caster and all allies within 10\' gain the actual climbing ability of a spider, even when using gloves and shoes, and when carrying objects in hand. The caster and affected allies can hang upside down, climb completely vertical surfaces with no handholds, move across spider webs, and even scurry along upside down at obtuse angles. Those affected move at their normal speeds, need never make Climb checks, and are immune to spider web spells.',
			},
			{
				roll: 29,
				result:
					'The caster and all allies within 10\' gain the actual climbing ability of a spider, even when using gloves and shoes, and when carrying objects in hand. The caster and affected allies can hang upside down, climb completely vertical surfaces with no handholds, move across spider webs, and even scurry along upside down at obtuse angles. Those affected move at their normal speeds, need never make Climb checks, and are immune to spider web spells.',
			},
			{
				roll: 30,
				result:
					'For a duration of 1 hour per caster level, and the caster and all allies within 10\' gain the actual climbing ability of a spider, even when using gloves and shoes, and when carrying objects in hand. The caster and his affected allies can hang upside down, climb completely vertical surfaces with no handholds, move across spider webs, and even scurry along upside down at obtuse angles. Those affected move at theirnormal speeds, need never make Climb checks, and are immune to spider web spells.',
			},
			{
				roll: 31,
				result:
					'For a duration of 1 hour per caster level, and the caster and all allies within 10\' gain the actual climbing ability of a spider, even when using gloves and shoes, and when carrying objects in hand. The caster and his affected allies can hang upside down, climb completely vertical surfaces with no handholds, move across spider webs, and even scurry along upside down at obtuse angles. Those affected move at theirnormal speeds, need never make Climb checks, and are immune to spider web spells.',
			},
			{
				roll: 32,
				result:
					'With this powerful casting, the wizard\'s face is occluded by a mask that combines all the spell\'s possible effects into a single visage. The caster has infravision up to 60\'; gains a +4 saving throw bonus against gaze attacks; harmful spells cast directly at the caster suffer a -2 penalty to spell checks; the caster can instill fear against any creature that fails a Will save, forcing it to flee for 1d4+CL rounds; the caster\'s AC is improved by +4, and all saves receive a +2 bonus (this stacks with the +4 bonus against gaze attacks); any attacker who  successfully strikes the caster with a physical melee or missile attack must make a DC 10 Luck check or possibly be struck by its own attack (compare the initial attack roll against its own AC); and the caster\'s face is transformed into a serpent\'s head, granting him the illusionary and hypnotic capabilities of a serpent-man (see page 425). At this level of success, the mask makes no alterations to the caster\'s face other than the snake\'s head transformation (which can be obscured with the illusion generation ability granted by that alteration).',
			},
			{
				roll: 33,
				result:
					'For the next day, the caster and all allies within 20\' gain all the abilities of a spider. First, those affected can climb as a natural ability, hang upside down, climb vertical surfaces and overhangs, and move on any surface regardless of handholds. Second, the recipients of this spell can launch sticky spider webs that can ensnare enemies. This counts as a ranged attack (at an additional +4 bonus) with a 50\' range, and targets are unable to move or take any action until they make a DC 16 Strength or Agility check. Finally, the melee attacks of those benefiting from the spell carry a poison; any wound inflicted also imposes a DC 16 Fort save or the target takes an additional 1d6 damage and loses 1d4 points of Strength.',
			},
			{
				roll: 34,
				result:
					'For the next day, the caster and all allies within 20\' gain all the abilities of a spider. First, those affected can climb as a natural ability, hang upside down, climb vertical surfaces and overhangs, and move on any surface regardless of handholds. Second, the recipients of this spell can launch sticky spider webs that can ensnare enemies. This counts as a ranged attack (at an additional +4 bonus) with a 50\' range, and targets are unable to move or take any action until they make a DC 16 Strength or Agility check. Finally, the melee attacks of those benefiting from the spell carry a poison; any wound inflicted also imposes a DC 16 Fort save or the target takes an additional 1d6 damage and loses 1d4 points of Strength.',
			},
			{
				roll: 35,
				result:
					'For the next day, the caster and all allies within 20\' gain all the abilities of a spider. First, those affected can climb as a natural ability, hang upside down, climb vertical surfaces and overhangs, and move on any surface regardless of handholds. Second, the recipients of this spell can launch sticky spider webs that can ensnare enemies. This counts as a ranged attack (at an additional +4 bonus) with a 50\' range, and targets are unable to move or take any action until they make a DC 16 Strength or Agility check. Finally, the melee attacks of those benefiting from the spell carry a poison; any wound inflicted also imposes a DC 16 Fort save or the target takes an additional 1d6 damage and loses 1d4 points of Strength.',
			},
			{
				roll: 36,
				result:
					'For the next day, the caster and all allies within 20\' gain all the abilities of a spider. First, those affected can climb as a natural ability, hang upside down, climb vertical surfaces and overhangs, and move on any surface regardless of handholds. Second, the recipients of this spell can launch sticky spider webs that can ensnare enemies. This counts as a ranged attack (at an additional +4 bonus) with a 50\' range, and targets are unable to move or take any action until they make a DC 16 Strength or Agility check. Finally, the melee attacks of those benefiting from the spell carry a poison; any wound inflicted also imposes a DC 16 Fort save or the target takes an additional 1d6 damage and loses 1d4 points of Strength.',
			},
			{
				roll: 37,
				result:
					'For the next day, the caster and all allies within 20\' gain all the abilities of a spider. First, those affected can climb as a natural ability, hang upside down, climb vertical surfaces and overhangs, and move on any surface regardless of handholds. Second, the recipients of this spell can launch sticky spider webs that can ensnare enemies. This counts as a ranged attack (at an additional +4 bonus) with a 50\' range, and targets are unable to move or take any action until they make a DC 16 Strength or Agility check. Finally, the melee attacks of those benefiting from the spell carry a poison; any wound inflicted also imposes a DC 16 Fort save or the target takes an additional 1d6 damage and loses 1d4 points of Strength.',
			},
			{
				roll: 38,
				result:
					'For the next day, the caster and all allies within 20\' gain all the abilities of a spider. First, those affected can climb as a natural ability, hang upside down, climb vertical surfaces and overhangs, and move on any surface regardless of handholds. Second, the recipients of this spell can launch sticky spider webs that can ensnare enemies. This counts as a ranged attack (at an additional +4 bonus) with a 50\' range, and targets are unable to move or take any action until they make a DC 16 Strength or Agility check. Finally, the melee attacks of those benefiting from the spell carry a poison; any wound inflicted also imposes a DC 16 Fort save or the target takes an additional 1d6 damage and loses 1d4 points of Strength.',
			},
			{
				roll: 39,
				result:
					'For the next day, the caster and all allies within 20\' gain all the abilities of a spider. First, those affected can climb as a natural ability, hang upside down, climb vertical surfaces and overhangs, and move on any surface regardless of handholds. Second, the recipients of this spell can launch sticky spider webs that can ensnare enemies. This counts as a ranged attack (at an additional +4 bonus) with a 50\' range, and targets are unable to move or take any action until they make a DC 16 Strength or Agility check. Finally, the melee attacks of those benefiting from the spell carry a poison; any wound inflicted also imposes a DC 16 Fort save or the target takes an additional 1d6 damage and loses 1d4 points of Strength.',
			},
			{
				roll: 40,
				result:
					'For the next day, the caster and all allies within 20\' gain all the abilities of a spider. First, those affected can climb as a natural ability, hang upside down, climb vertical surfaces and overhangs, and move on any surface regardless of handholds. Second, the recipients of this spell can launch sticky spider webs that can ensnare enemies. This counts as a ranged attack (at an additional +4 bonus) with a 50\' range, and targets are unable to move or take any action until they make a DC 16 Strength or Agility check. Finally, the melee attacks of those benefiting from the spell carry a poison; any wound inflicted also imposes a DC 16 Fort save or the target takes an additional 1d6 damage and loses 1d4 points of Strength.',
			},
		],
	},
};