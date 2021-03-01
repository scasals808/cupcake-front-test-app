import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    app: appReducer
})

export type RootReducerType = typeof rootReducer

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .prepend(thunkMiddleware)
            .concat(logger)
})

export type AppRootStateType = ReturnType<RootReducerType>

// @ts-ignore
window.store = store