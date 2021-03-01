import {appReducer, getFirstRates, InitialStateType} from "./app-reducer";

let startState: InitialStateType

beforeEach(() => {
    startState = {
        rates: [],
        isInitialized: false
    }
})

test('property isInitialized should changed', () => {
    const endState = appReducer(startState, getFirstRates.fulfilled)
    expect(endState.isInitialized).toBe(true);
});
