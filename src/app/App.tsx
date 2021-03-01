import React, {useEffect} from 'react';
import './App.css';
import {AppRootStateType} from "./store";
import {useDispatch, useSelector} from "react-redux";
import {getFirstRates, getNextRates, StateType} from "./app-reducer";
import {Table} from "../features/Table /Table";

function App() {
    const dispatch = useDispatch()
    const rates = useSelector<AppRootStateType, Array<StateType>>(state => state.app.rates)
    const init = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    useEffect(() => {
        !init ? dispatch(getFirstRates()) : setTimeout(() => {
            dispatch(getNextRates())
        }, 10 * 5000)
    }, [rates])

    const data = React.useMemo(() => rates, [rates])

    return <Table data={data}/>
}

export default App;


