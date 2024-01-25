import { configureStore } from "@reduxjs/toolkit";
import dccCharactersReducer from "../slices/dcc/charactersSlice";
import diceReducer from "../slices/diceSlice";
const store = configureStore({
    reducer: {
        dccCharacters: dccCharactersReducer,
        dice: diceReducer
    }
});

export default store;