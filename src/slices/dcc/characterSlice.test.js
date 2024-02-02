import { dice } from '../diceSlice';
import { generateCharacter } from './charactersSlice';

describe('generateCharacter', () => {
	it('populates startingCharacter', () => {
		let character = generateCharacter();
		expect(character.character.race.raceName).toEqual(expect.any(String));
		expect(character.character.occupation.occupationName).toEqual(expect.any(String));
        expect(character.character.name).toEqual(expect.any(String));
        expect(character.character.level.key).toBe(0);
        expect(character.character.nextLevel.key).toBe(1);
        expect(character.character.class.key).toBe('none');
        expect(character.character.class.classLevel.key).toBe(0);
	});
    
	it('populates attributes', () => {
		let character = generateCharacter();
		expect(character.character.agility.modifier).toEqual(expect.any(Number));
	});

	it('caclulates armor class', () => {
		let character = generateCharacter();
		expect(character.character.armorClass.base).toEqual(10 + character.character.agility.currentModifier);
		expect(character.character.armorClass.current).toEqual(character.character.armorClass.base + character.character.armorClass.armorModifier);
	});

	it('caclulates hit points', () => {
		let character = generateCharacter();
		expect(character.character.hitPoints.max).toEqual(expect.any(Number));
		expect(character.character.hitPoints.current).toEqual(character.character.hitPoints.max);
	});

	it('caclulates fumbleDie', () => {
		let character = generateCharacter();
		expect(character.character.fumbleDie).toStrictEqual({number: 1, die: dice.d4});
	});

	it('caclulates checkModifier', () => {
		let character = generateCharacter();
		expect(character.character.checkModifier).toBe(0);
	});

	it('caclulates attackModifiers', () => {
		let character = generateCharacter();
		expect(character.character.meleeAttackModifier).toStrictEqual(character.character.strength.currentModifier);
	});
});


