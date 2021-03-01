import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
})

export const AppAPI = {
    getInitialFirstMarket() {
        return instance.get<ResponseType>('first')
    },
    getInitialSecondMarket() {
        return instance.get<ResponseType>('second')
    },
    getInitialThirdMarket() {
        return instance.get<ResponseType>('third')
    },
    getFirstMarket() {
        return instance.get<ResponseType>('first/poll')
    },
    getSecondMarket() {
        return instance.get<ResponseType>('second/poll')
    },
    getThirdMarket() {
        return instance.get<ResponseType>('third/poll')
    },
}

export type ResponseType = {
    rates: RatesType,
    timestamp: number,
    base: string,
    date: string
}

export type RatesType = {
    RUB: number,
    USD: number,
    EUR: number
}