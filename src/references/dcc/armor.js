import { dice } from "../../slices/diceSlice";
import { coinTypes } from "./coinTypes";

export const armor = {
    padded: {
        key: 'padded',
        name: 'Padded',
        armorClassModifier: 1,
        checkModifier: 0,
        speedModifier: 0,
        fumbleDie: {number: 1, die: dice.d8},
        cost: { number: 5, coinType: coinTypes.gold }
    },
    leather: {
        key: 'leather',
        name: 'Leather',
        armorClassModifier: 2,
        checkModifier: -1,
        speedModifier: 0,
        fumbleDie: {number: 1, die: dice.d8},
        cost: { number: 20, coinType: coinTypes.gold }
    },
    
}