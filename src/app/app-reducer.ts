import {AppAPI} from './../api/app-api'
import {ResponseType} from './../api/app-api'
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const InitialState: InitialStateType = {
    rates: [],
    isInitialized: false
}

export const getFirstRates = createAsyncThunk('app/firstRender', () => {
    let firstMarket = AppAPI.getInitialFirstMarket().then(res => res.data)
    let secondMarket = AppAPI.getInitialSecondMarket().then(res => res.data)
    let thirdMarket = AppAPI.getInitialThirdMarket().then(res => res.data)
    return resolveAll([firstMarket, secondMarket, thirdMarket])
})

export const getNextRates = createAsyncThunk('app/nextRenders', () => {
    let firstMarket = AppAPI.getFirstMarket().then(res => res.data)
    let secondMarket = AppAPI.getSecondMarket().then(res => res.data)
    let thirdMarket = AppAPI.getThirdMarket().then(res => res.data)
    return resolveAll([firstMarket, secondMarket, thirdMarket])
})

const resolveAll = (daraArray: Array<Promise<ResponseType>>) => {
    return Promise.all(daraArray).then(values => {
        const RUB = {
            name: 'RUB/CUPCAKE',
            first: Number(values[0].rates.RUB.toFixed(2)),
            second: Number(values[1].rates.RUB.toFixed(2)),
            third: Number(values[2].rates.RUB.toFixed(2))
        }
        const USD = {
            name: 'USD/CUPCAKE',
            first: Number(values[0].rates.USD.toFixed(2)),
            second: Number(values[1].rates.USD.toFixed(2)),
            third: Number(values[2].rates.USD.toFixed(2))
        }
        const EUR = {
            name: 'EUR/CUPCAKE',
            first: Number(values[0].rates.EUR.toFixed(2)),
            second: Number(values[1].rates.EUR.toFixed(2)),
            third: Number(values[2].rates.EUR.toFixed(2))
        }
        const RUB_USD = {
            name: 'RUB/USD',
            first: Number((values[0].rates.RUB / values[0].rates.USD).toFixed(2)),
            second: Number((values[1].rates.RUB / values[1].rates.USD).toFixed(2)),
            third: Number((values[2].rates.RUB / values[2].rates.USD).toFixed(2))
        }
        const RUB_EUR = {
            name: 'RUB/EUR',
            first: Number((values[0].rates.RUB / values[0].rates.EUR).toFixed(2)),
            second: Number((values[1].rates.RUB / values[1].rates.EUR).toFixed(2)),
            third: Number((values[2].rates.RUB / values[2].rates.EUR).toFixed(2))
        }
        const EUR_USD = {
            name: 'EUR/USD',
            first: Number((values[0].rates.EUR / values[0].rates.USD).toFixed(2)),
            second: Number((values[1].rates.EUR / values[1].rates.USD).toFixed(2)),
            third: Number((values[2].rates.EUR / values[2].rates.USD).toFixed(2))
        }
        return [RUB, USD, EUR, RUB_USD, RUB_EUR, EUR_USD]
    })
}

const slice = createSlice({
    name: 'app',
    initialState: InitialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFirstRates.fulfilled, (state, action) => {
            state.isInitialized = true
            state.rates = action.payload
        });
        builder.addCase(getNextRates.fulfilled, (state, action) => {
            state.rates = action.payload
        });
    }
})

export const appReducer = slice.reducer

export type InitialStateType = {
    rates: Array<StateType>,
    isInitialized: boolean
}

export type StateType = {
    name: string,
    first: number,
    second: number,
    third: number
}