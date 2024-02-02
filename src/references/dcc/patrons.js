export const patrons = {
	bobugbubilz: {
		key: 'bobugbubilz',
		name: 'Bobugbubilz',
		invocationResults: [
			{
				roll: 12,
				result:
					'Bobugbubilz is preoccupied. The ground oozes muck, rain falls from a clear sky, and other signs of the Toadfiend manifest, giving the caster a surge of energy in the form of +1d6 Strength for the next hour. This may be spellburned as normal.',
				rolls: { dice: { number: 1, die: 6, name: '+x strength for next hour' } }
			}
		],
		taints: [
			{
				roll: 1,
				result:
					"Buzzing, biting flies appear when the caster casts any spell. They distract and annoy but otherwise do no harm. If this result is rolled a second time, the effect is amplified such that a large black swarm of flies appears with each spell. The swarm is large enough to distract nearby creatures within 10', both friend and foe (DC 8 Will save or -1 to all rolls for one round), though the caster is immune. If this result is rolled a third time, the swarm of flies follows the caster constantly, day and night, whether he is casting spells or doing something else."
			}
		],
		spells: [
			{ level: 1, _ref: 'spellList.tadpoleTransformation' },
			{ level: 2, _ref: 'spellList.gloriousMire' },
			{ level: 3, _ref: 'spellList.bottomfeederBond' }
		],
		spellBurns: [
			{ roll: 1, result: 'Bobugbubilz needs the blood of a dry-dweller (a creature that lives only on land). The caster\'s blood will do (expressed as Stamina, Strength, or Agility loss).' },
			{ roll: 2, result: 'The demon lord of amphibians needs the feet of a man-creature. In this special situation, the character can spellburn up to 10 points of ability score loss, but need not take any physical action or damage. If he sacrifices the feet of a man-creature (any humanoid will do) to Bobugbubilz before the next sunrise, the character takes no spellburn. If he fails to find such a sacrifice, he takes the full 10 points, distributed across ability scores at the judge\'s discretion, at the next sunrise' },
			{ roll: 3, result: 'Bobugbubilz requires the sweet voice of the caster to make an invocation that his own amphibious servants cannot pronounce properly. Time slows to a crawl as the caster character is whisked away to a dizzying plane of close-quartered, moist, womb-like caverns, where is forced to read a text written in the words of his native language but with a recondite meaning utterly beyond his comprehension. Upon completing the invocation, he appears back on his native plane. No time seems to have passed, and he finds himself weakened by whatever extent he sacrificed ability score points for spellburn.' },
			{ roll: 4, result: 'A slithering host of foul serpents wriggles forth from the ground at the caster\'s feet, where they promptly bite his ankles and begin sucking his blood. If the caster resists, the serpents flee and the spellburn fails. If he does not resist, the serpents suck blood until the spellburn is complete as normal, then they wriggle back into the earth. As they disappear below the ground, one turns its head back to offer thanks from Bobugbubilz…then it is gone.' }
		]
	}
};
