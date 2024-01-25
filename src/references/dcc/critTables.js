import { dice } from '../../slices/diceSlice';
export const critTables = {
	1: {
		0: {
			result: 'Force of blow shivers your weapon free of your grasp. Inflict +1d6 damage with this strike and you are disarmed.',
			rolls: [{ number: 1, die: dice.d6 }],
		},
		1: { result: 'Opportunistic strike. Inflict +1d3 damage with this strike.', rolls: [{ number: 1, die: dice.d3 }] },
		2: { result: 'Foe jabbed in the eye! Ugly bruising and inflict +1d4 damage with this strike.', rolls: [{ number: 1, die: dice.d4 }] },
		3: {
			result: 'Stunning crack to forehead. Inflict +1d3 damage with this strike, and the foe falls to the bottom of the initiative count next round.',
			rolls: [{ number: 1, die: dice.d4 }]
		},
		4: {
			result: "Strike to foe's kneecap. Inflict +1d4 damage with this strike and the foe suffers a -10' penalty to speed until healed.",
			rolls: [{ number: 1, die: dice.d4 }]
		},
		5: { result: 'Solid strike to torso. Inflict +1d6 damage with this strike.', rolls: [{ number: 1, die: dice.d6 }] },
		6: { result: 'Lucky strike disarms foe. You gain a free attack if the enemy stoops to retrieve his weapon.', rolls: [{ number: 1, die: dice.d6 }] },
		7: { result: "Smash foe's hand. Inflict +2d3 damage with this strike. You break two of the enemy's fingers.", rolls: [{ number: 2, die: dice.d3 }] },
		8: { result: 'Numbing strike! Cursing in agony, the foe is unable to attack next round.', rolls: [{ number: 1, die: dice.d6 }] },
		9: { result: "Smash foe's nose. Inflict +2d4 damage with this strike and blood streams down the enemy's face.", rolls: [{ number: 2, die: dice.d4 }] },
		10: { result: 'Foe trips on his own feet and falls prone for the remainder of the round.', rolls: [{ number: 1, die: dice.d6 }] },
		11: { result: 'Piercing strike. Inflict +2d4 damage with this strike.', rolls: [{ number: 2, die: dice.d4 }] },
		12: { result: 'Strike to groin. The foe must make a DC 15 Fort save or spend the next two rounds retching.', rolls: [{ number: 1, die: dice.d6 }] },
		13: { result: "Blow smashes foe's ankle; his movement speed is reduced by half.", rolls: [{ number: 1, die: dice.d6 }] },
		14: { result: 'Strike grazes temple; blood blinds the foe for 1d3 rounds.', rolls: [{ number: 1, die: dice.d3 }] },
		15: { result: "Stab enemy's weapon hand. The weapon is lost and knocked 1d10+5 feet away.", rolls: [{ number: 1, die: dice.d10 }] },
		16: {
			result:
				"Narrowly avoid foe's counterstrike! Inflict normal damage and make another attack roll. If the second attack hits, you inflict an additional +1d6 damage.",
			rolls: [{ number: 1, die: dice.d6 }]
		},
		17: { result: 'Blow to throat. Foe staggers around for 2 rounds and is unable to speak, cast spells, or attack.', rolls: [{ number: 1, die: dice.d6 }] },
		18: { result: ' Foe falls into your attack. He takes +2d6 damage from the strike and curses your luck.', rolls: [{ number: 2, die: dice.d6 }] },
		19: { result: ' Miracle strike. The foe must make a DC 20 Fort save or fall unconscious.', rolls: [{ number: 1, die: dice.d6 }] },
		20: { result: "Lucky blow dents foe's skull! Inflict +2d6 damage with this strike", rolls: [{ number: 2, die: dice.d6 }] }
	},
	2: {
		0: { result: 'Miss! Hesitation costs you the perfect strike!  ', rolls: [{ number: 1, die: dice.d6 }] },
		1: { result: 'Strike misses critical organs. Inflict a paltry +2d3 damage with this strike.', rolls: [{ number: 2, die: dice.d3 }] },
		2: {
			result: "Slashes to head removes foe's ear. Inflict +1d6 damage with this strike and leave the enemy with a nasty scar.",
			rolls: [{ number: 1, die: dice.d6 }]
		},
		3: { result: 'Clean strike to back. Inflict +2d6 damage with this strike.', rolls: [{ number: 2, die: dice.d6 }] },
		4: { result: 'Blow to chest staggers foe. You can make an immediate free attack.' },
		5: {
			result: "Blow pierces foe's kidneys. Inflict +3d3 damage with this strike, and the foe is stunned for 1 round.",
			rolls: [{ number: 3, die: dice.d3 }]
		},
		6: { result: 'Foe dazed by ferocious attack; his speed and actions are reduced by half.' },
		7: { result: 'Strike to chest grazes vital organ. Inflict +3d4 damage with this strike.', rolls: [{ number: 3, die: dice.d4 }] },
		8: { result: "Strike cuts a line down foe's face. He is blinded by blood for 1d4 rounds.", rolls: [{ number: 1, die: dice.d4 }] },
		9: { result: 'Foe stumbles over his own limbs, falling prone. Make another attack.' },
		10: { result: 'Masterful strike! Inflict +2d6 damage with this strike.', rolls: [{ number: 2, die: dice.d6 }] },
		11: { result: 'Strike severs larynx. Foe is reduced to making wet fish noises.  ' },
		12: { result: 'Savage strike! Foe must succeed on a Fort save (DC 10 + PC level) or faint from the pain.' },
		13: { result: 'Foe disoriented by quick strikes. Foe suffers a -4 penalty to attack rolls for 1d4 rounds.', rolls: [{ number: 1, die: dice.d4 }] },
		14: { result: 'Strike to head. Foe must make a Fort save (DC 10 + PC level) or fall unconscious' },
		15: { result: 'Blow drives foe to ground. Inflict +2d6 damage with this strike, and the enemy is knocked prone.', rolls: [{ number: 2, die: dice.d6 }] },
		16: {
			result: " Lightning-fast shot to the face pops the foe's eye like a grape. Foe is permanently blinded in one eye and can take no actions for 1d3 rounds.",
			rolls: [{ number: 1, die: dice.d3 }]
		},
		17: {
			result: 'Strike pierces lung. Inflict +2d6 damage with this strike, and the foe can take only one action on his next turn.',
			rolls: [{ number: 2, die: dice.d6 }]
		},
		18: {
			result:
				'Devastating strike to back of head. Inflict +1d8 damage with this strike, and the foe must make a Fort save (DC 10 + PC level) or fall unconscious',
			rolls: [{ number: 1, die: dice.d8 }]
		},
		19: {
			result:
				'Attack severs major artery. Inflict +1d10 damage with this strike, and the foe must make a Fort save (DC 10 + PC level) or fall unconscious from shock and massive blood loss.',
			rolls: [{ number: 1, die: dice.d10 }]
		},
		20: {
			result: 'Throat slashed! Inflict +2d6 damage with this strike, and the foe must make a Fort save (DC 13 + PC level) or die in 1d4 rounds.',
			rolls: [{ number: 1, die: dice.d4 }]
		},
		21: {
			result: 'Strike pierces spinal column. Inflict +3d6 damage with this strike, and the foe must make a Fort save (DC 15 + PC level) or suffer paralysis.',
			rolls: [{ number: 3, die: dice.d6 }]
		},
		22: {
			result:
				'Chest skewered, spearing a variety of organs. Inflict +2d6 damage with this strike, and the foe must make a Fort save (DC 13 + PC level) or die in 1d4 rounds.',
			rolls: [{ number: 2, die: dice.d6 }]
		},
		23: {
			result:
				'Strike through ear canal enters the brain. Ear wax instantly removed, and the foe must make a Fort save (DC 15 + PC level) or die instantly. Inflict an extra +2d6 damage on successful save.',
			rolls: [{ number: 2, die: dice.d6 }]
		},
		24: {
			result: 'Strike through heart! Inflict +3d6 damage with this strike, and the foe must make a Fort save (DC 20 + PC level) or die instantly.',
			rolls: [{ number: 3, die: dice.d6 }]
		}
	},
	3: {
		0: {
			result:
				'Battle rage makes friend and foe indistinguishable. Foe is hit for +1d12 damage, and the ally nearest him is also hit by a rebounding blow for 1d4 damage.**',
			rolls: [
				{ name: 'Additional Damage', number: 1, die: dice.d12 },
				{ name: 'Rebounding Blow', number: 1, die: dice.d4 }
			]
		},
		1: { result: 'Savage attack! Inflict +1d6 damage with this strike.', rolls: [{ number: 1, die: dice.d6 }] },
		2: { result: 'Attack sweeps foe off his feet. Next round, the enemy is prone.' },
		3: { result: 'Foe steps into attack. Inflict +1d8 damage with this strike.', rolls: [{ number: 1, die: dice.d8 }] },
		4: { result: 'Powerful strike hammers foe to his knees. Make another attack.' },
		5: {
			result: "Smash foe's nose in an explosion of blood. Inflict +1d6 damage with this strike, and the foe loses his sense of smell for 1d4 hours.",
			rolls: [
				{ name: 'Additional Damage', number: 1, die: dice.d6 },
				{ name: 'Loss of smell for x hours', number: 1, die: dice.d4 }
			]
		},
		6: {
			result: 'Brutal strike to torso. Inflict +1d8 damage with this strike, and the foe suffers multiple broken ribs.',
			rolls: [{ name: 'Additional Damage', number: 1, die: dice.d8 }]
		},
		7: {
			result: "Strike to hand knocks weapon into the air. The weapon lands 1d20+5' away.",
			rolls: [{ name: 'Weapon lands x feet away', number: 1, die: dice.d20 }]
		},
		8: {
			result: 'Blow caroms off skull, deafening foe for 1d6 days. Inflict +1d6 damage with this strike.',
			rolls: [
				{ name: 'Additional Damage', number: 1, die: dice.d6 },
				{ name: 'Deaf for x days', number: 1, die: dice.d6 }
			]
		},
		9: {
			result: "Strike to leg splinters femur. Inflict +2d6 damage with this strike and foe loses 10' of movement until healed.",
			rolls: [{ name: 'Additional Damage', number: 2, die: dice.d6 }]
		},
		10: { result: "Sunder foe's weapon! Shards of metal fill the air" },
		11: {
			result: "Strike hammers foe's belly causing massive internal bleeding. Unless he receives magical healing, the foe dies in 1d5 hours",
			rolls: [{ name: 'Dies in x hours without magical healing', number: 1, die: dice.d5 }]
		},
		12: { result: 'Blow to cranium staggers foe. The foe must make a Fort save (10 + PC level) or sink to floor, unconscious.' },
		13: {
			result: "Strike breaks foe's jaw. Blood and shattered teeth ooze down the foe's face. Inflict +1d8 damage with this strike.",
			rolls: [{ name: 'Additional Damage', number: 1, die: dice.d8 }]
		},
		14: { result: "Attack hammers foe's torso. Inflict +2d8 damage with this strike.", rolls: [{ name: 'Additional Damage', number: 2, die: dice.d8 }] },
		15: {
			result: 'Strike dislocates shoulder! Inflict +1d8 damage and shield arm hangs loosely by muscle and skin; no AC bonus from shield.',
			rolls: [{ name: 'Additional Damage', number: 1, die: dice.d8 }]
		},
		16: { result: "Attack reduces foe's attack hand to formless tissue; -4 penalty to future attacks." },
		17: { result: 'Furious blows hammer target prone. Make another attack.' },
		18: {
			result:
				"Blow hammers shards of bone into foe's forebrain; gray matter oozes out. Inflict +1d8 damage with this strike, and the foe suffers 1d4 points of Int and Per loss.",
			rolls: [
				{ name: 'Additional Damage', number: 1, die: dice.d8 },
				{ name: 'Intelligence and Personality loose x points', number: 1, die: dice.d4 }
			]
		},
		19: { result: 'Devastating strike to the chest. Inflict +2d8 damage with this strike.', rolls: [{ name: 'Additional Damage', number: 2, die: dice.d8 }] },
		20: {
			result: 'Chest strike stuns foe for 1d3 rounds. Inflict +1d8 damage with this strike.',
			rolls: [
				{ name: 'Additional Damage', number: 1, die: dice.d8 },
				{ name: 'Stunned for x rounds', number: 1, die: dice.d3 }
			]
		},
		21: {
			result:
				"Strike to leg shatters femur, knocking foe to the ground. Foe's movement drops by half. Inflict +2d8 damage with this strike and make another attack.",
			rolls: [{ name: 'Additional Damage', number: 2, die: dice.d8 }]
		},
		22: { result: 'Weapon arm sundered by strike. The weapon is lost along with any chance of making an attack with this arm.' },
		23: {
			result: 'Blow craters skull. Inflict +2d8 damage with this strike, and the target permanently loses 1d4 Int and Per.',
			rolls: [
				{ name: 'Additional Damage', number: 2, die: dice.d8 },
				{ name: 'Permanently lose x Intelligence and Personality points', number: 1, die: dice.d4 }
			]
		},
		24: {
			result: 'Masterful strike to throat. Inflict +2d8 damage with this strike and the foe staggers about gasping for air for 1d4 rounds.',
			rolls: [
				{ name: 'Additional Damage', number: 2, die: dice.d8 },
				{ name: 'Staggers and gasping for x rounds', number: 1, die: dice.d4 }
			]
		},
		25: { result: 'Attack punches shattered ribs through lungs. Foe loses 50% of his remaining hit points and vomits copious amounts of blood.' },
		26: {
			result: "Attack shatters foe's face, destroying both eyes. Inflict +2d8 damage with this strike, and the foe is permanently blinded.",
			rolls: [{ name: 'Additional Damage', number: 2, die: dice.d8 }]
		},
		27: {
			result:
				'Crushing blow hammers chest. Inflict +3d8 damage with this strike, and the foe must make a Fort save (DC 15 + PC level) or be knocked unconscious.',
			rolls: [{ name: 'Additional Damage', number: 3, die: dice.d8 }]
		},
		28: {
			result: 'Blow destroys spinal column. Inflict +3d8 damage with this strike, and the foe must make a Fort save (DC 15 + PC level) or suffer paralysis.',
			rolls: [{ name: 'Additional Damage', number: 3, die: dice.d8 }]
		}
	},
	4: {
		0: {
			result:
				'Battle rage makes friend and foe indistinguishable. Foe is hit for +2d8 damage, and the ally nearest him is also hit by a rebounding blow for 1d4 damage.**',
			rolls: [
				{ name: 'Additional Damage', number: 2, die: dice.d8 },
				{ name: 'Rebounding Blow', number: 1, die: dice.d4 }
			]
		},
		1: { result: 'Herculean blow. Inflict +2d12 damage with this strike.', rolls: [{ name: 'Additional Damage', number: 2, die: dice.d12 }] },
		2: {
			result: "Ferocious strike leaves foe's weapon hand dangling from the stump of a wrist. Inflict +1d12 damage with this strike.",
			rolls: [{ name: 'Additional Damage', number: 1, die: dice.d12 }]
		},
		3: {
			result: 'Strike sweeps foe to the ground. Inflict +1d12 damage with this strike and make another attack on prone enemy.',
			rolls: [{ name: 'Additional Damage', number: 1, die: dice.d12 }]
		},
		4: {
			result: 'Hammering blow drives nose cartilage into brain. Inflict +1d12 damage with this strike, and the foe suffers 1d6 Int loss.',
			rolls: [
				{ name: 'Additional Damage', number: 1, die: dice.d12 },
				{ name: 'Intelligence looses x points', number: 1, die: dice.d6 }
			]
		},
		5: {
			result: "Foe's weapon shattered.* If the foe has no weapon, inflict +2d12 damage with this strike.",
			rolls: [{ name: 'Additional Damage', number: 2, die: dice.d12 }]
		},
		6: { result: "Strike shatters foe's breastbone. The foe must make a Fort save (DC 15 + PC level) or fall unconscious as his internal organs collapse." },
		7: {
			result: 'Foe driven back by furious assault. Inflict +2d12 damage with this strike, and the foe forgoes his next attack.',
			rolls: [{ name: 'Additional Damage', number: 2, die: dice.d12 }]
		},
		8: {
			result: 'Concussive strike leaves foe dazed. Inflict +1d8 damage with this strike and make a second attack.',
			rolls: [{ name: 'Additional Damage', number: 1, die: dice.d8 }]
		},
		9: {
			result:
				'Blow to throat carries through to spinal column, reducing everything in between to pasty mush. Inflict +2d12 damage with this strike, and the foe loses speech for 1d4 weeks.',
			rolls: [
				{ name: 'Additional Damage', number: 2, die: dice.d12 },
				{ name: 'Speech loss for x weeks', number: 1, die: dice.d4 }
			]
		},
		10: {
			result: 'Blow craters temple. The foe must make a Fort save (DC 15 + PC level) or be blinded by pain and blood for 1d4 rounds.',
			rolls: [{ name: 'Blind for x rounds', number: 1, die: dice.d4 }]
		},
		11: {
			result:
				'Strike reduces face to a formless mass of flesh and bone fragments. Inflict +2d12 damage with this strike, and the foe has trouble making hard consonants. ',
			rolls: [{ name: 'Additional Damage', number: 2, die: dice.d12 }]
		},
		12: {
			result: 'You see red! Inflict +1d12 damage with this strike as you are overcome by battle rage!**',
			rolls: [{ name: 'Additional Damage', number: 1, die: dice.d12 }]
		},
		13: {
			result: 'Hammering strike to torso crushes lesser organs into paste. Inflict +2d12 damage with this strike.  ',
			rolls: [{ name: 'Additional Damage', number: 2, die: dice.d12 }]
		},
		14: { result: 'Blow to spinal column numbs lower limbs. The foe suffers a -4 penalty to AC as he learns to walk again.  ' },
		15: {
			result: 'Fearsome strike drives enemy to the bloodsplattered floor. Foe cowers in fear, prone, for 1d4 rounds.',
			rolls: [{ name: 'Cower in fear for x rounds', number: 1, die: dice.d4 }]
		},
		16: {
			result: 'Blow shatters shield. Inflict +2d12 damage with this strike. If the foe has no shield, he is stunned by pain for 1d4 rounds.',
			rolls: [{ name: 'Additional Damage', number: 2, die: dice.d12 }]
		},
		17: { result: "Foe's kneecap explodes into red mist. Foe's movement drops to 0', and you make another attack." },
		18: {
			result:
				'Frontal lobotomy. Inflict +1d12 damage with this strike, and the foe must make a Fort save (DC 15 + PC level) or suffer amnesia. The foe is stunned for 1d4 rounds, regardless.',
			rolls: [
				{ name: 'Additional Damage', number: 1, die: dice.d12 },
				{ name: 'Stunned for x rounds', number: 1, die: dice.d4 }
			]
		},
		19: { result: 'Strike to weapon arm. Foe takes triple damage from his own weapon as it is hammered into his face. Foe drops weapon in dumbfounded awe.' },
		20: {
			result:
				'Blow crushes spinal cord. Inflict +3d12 damage with this strike, and the foe must make a Fort save (DC 15 + PC level) or suffer permanent paralysis.',
			rolls: [{ name: 'Additional Damage', number: 3, die: dice.d12 }]
		},
		21: {
			result: 'Blow reduces internal organs to jelly. Death is inevitable in 1d8 rounds.',
			rolls: [{ name: 'Inevitable death in x rounds', number: 1, die: dice.d8 }]
		},
		22: {
			result: 'Target is disemboweled, spilling his entrails onto the ground. The foe dies of shock in 1d6 rounds.',
			rolls: [{ name: 'Dies of shock in x rounds', number: 1, die: dice.d6 }]
		},
		23: {
			result: 'Strike to chest explodes heart. Inflict +3d12 damage with this strike, and the foe must make a Fort save (DC 15 + PC level) or die instantly.',
			rolls: [{ name: 'Additional Damage', number: 3, die: dice.d12 }]
		},
		24: {
			result: 'Skull crushed like a melon. Inflict +3d12 damage with this strike, and the foe must make a Fort save (DC 20 + PC level) or die in 1d3',
			rolls: [
				{ name: 'Additional Damage', number: 3, die: dice.d12 },
				{ name: 'Death in x rounds', number: 1, die: dice.d3 }
			]
		}
	},
	5: {
		0: {
			result:
				'Battle rage makes friend and foe indistinguishable. Foe is hit for +3d8 damage, and the ally nearest him is also hit by a rebounding blow for 1d4 damage.',
			rolls: [
				{ name: 'Additional Damage', number: 3, die: dice.d8 },
				{ name: 'Rebounding Blow', number: 1, die: dice.d4 }
			]
		},
		1: {
			result: "Foe's weapon shattered.* If the foe has no weapon, inflict +3d12 damage with this strike.",
			rolls: [{ name: 'Additional Damage', number: 3, die: dice.d12 }]
		},
		2: {
			result: "Furious assault hurls foe back 1d10'. Any adjacent foes accidentally strike the target for damage.",
			rolls: [{ name: 'Blown back x feet', number: 1, die: dice.d10 }]
		},
		3: {
			result: 'Blow to skull destroys ear. Inflict +1d12 damage with this strike, and the foe suffers permanent deafness.',
			rolls: [{ name: 'Additional Damage', number: 1, die: dice.d12 }]
		},
		4: { result: 'Strike to gut! The foe must make a Fort save (DC 20 + PC level) or spend the next 2 rounds retching bile from a ruptured stomach.' },
		5: {
			result: 'Foe casts weapon away and wails for mercy. Inflict +1d12 damage with this strike and make another attack.',
			rolls: [{ name: 'Additional Damage', number: 1, die: dice.d12 }]
		},
		6: { result: 'Strike scalps foe. Blood courses down his face, and the foe is effectively blinded until healed.' },
		7: { result: 'Foe entangled on your weapon, reducing his AC by -6 while caught. Make another attack.' },
		8: {
			result: 'You see red! Inflict +1d12 damage with this strike as you are overcome by battle rage!**',
			rolls: [{ name: 'Additional Damage', number: 1, die: dice.d12 }]
		},
		9: {
			result: 'You see red! Inflict +1d12 damage with this strike as you are overcome by battle rage!**',
			rolls: [{ name: 'Additional Damage', number: 1, die: dice.d12 }]
		},
		10: {
			result: 'You see red! Inflict +1d12 damage with this strike as you are overcome by battle rage!**',
			rolls: [{ name: 'Additional Damage', number: 1, die: dice.d12 }]
		},
		11: {
			result: 'You see red! Inflict +1d12 damage with this strike as you are overcome by battle rage!**',
			rolls: [{ name: 'Additional Damage', number: 1, die: dice.d12 }]
		},
		12: {
			result: 'You see red! Inflict +1d12 damage with this strike as you are overcome by battle rage!**',
			rolls: [{ name: 'Additional Damage', number: 1, die: dice.d12 }]
		},
		13: {
			result: 'Strike to weapon arm. Foe takes quadruple damage from his own weapon as it is hammered into his face. Foe drops weapon in dumbfounded awe.'
		},
		14: {
			result: 'Strike to weapon arm. Foe takes quadruple damage from his own weapon as it is hammered into his face. Foe drops weapon in dumbfounded awe.'
		},
		15: {
			result:
				'Blow sunders shield. Inflict +2d12 damage with this strike. If the foe has no shield, he must make a Fort save (DC 20 + PC level) or be knocked unconscious from the pain',
			rolls: [{ name: 'Additional Damage', number: 2, die: dice.d12 }]
		},
		16: { result: "Strike to top of skull shortens spinal column, shortening foe by 6”. Resulting nerve damage reduces foe's AC by -4." },
		17: { result: 'Target is disemboweled, spilling his entrails onto the ground. Foe dies instantly of shock.' },
		18: { result: "Blow destroys target's face. Foe is immediately rendered blind and deaf and is now capable of only wet, gurgling sounds." },
		19: {
			result: "Strike removes crown of target's skull. Foe dies from exposed brain matter in 3d3 rounds.",
			rolls: [{ name: 'Dies in x rounds', number: 3, die: dice.d3 }]
		},
		20: {
			result: "Blow severs shield arm. Inflict +2d12 damage with this strike. Foe's hopes of two-handed weapon mastery dashed.",
			rolls: [{ name: 'Additional Damage', number: 2, die: dice.d12 }]
		},
		21: {
			result: "Godly attack. Inflict +3d12 damage with this strike. If the target dies, move up to 10' and make another attack on any foe within 10'.",
			rolls: [{ name: 'Additional Damage', number: 3, die: dice.d12 }]
		},
		22: {
			result:
				"Blow severs leg. Inflict +2d12 damage with this strike, and the foe's movement drops to zero. Foe does nothing but wail in agony for 1d4 rounds.",
			rolls: [
				{ name: 'Additional Damage', number: 2, die: dice.d12 },
				{ name: 'Wails in agony', number: 1, die: dice.d4 }
			]
		},
		23: {
			result: 'Strike to skull stuns foe for 1d4+1 rounds and permanently reduces Int by 1d12. Make another attack on your inert foe.',
			rolls: [
				{ name: 'Stunned for x rounds', number: 1, die: dice.d4, modifier: 1 },
				{ name: 'Reduce intelligence reduced by x poins', number: 2, die: dice.d12 }
			]
		},
		24: {
			result: 'Strike severs weapon arm. Inflict +2d12 damage with this strike, and the foe is disarmed, literally and figuratively.',
			rolls: [{ name: 'Additional Damage', number: 2, die: dice.d12 }]
		},
		25: { result: "Devastating strike to torso voids foe's bowels and crushes organs into paste.  Foe loses 50% of current hit points and all dignity." },
		26: {
			result: 'Strike crushes throat. Foe begins drowning in his own blood and expires in 1d4 rounds.',
			rolls: [{ name: 'Dies in x rounds', number: 1, die: dice.d4 }]
		},
		27: {
			result: 'Crippling blow to spine. Inflict +4d12 damage with this strike, and the foe suffers permanent paralysis.',
			rolls: [{ name: 'Additional Damage', number: 4, die: dice.d12 }]
		},
		28: { result: "Foe decapitated with a single strike. You are Death incarnate. Continue to make attacks against any foes within 10' until you miss" }
	}
};
