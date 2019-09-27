import { createStore } from 'redux';

const initialState = {
    response: false,
    symbol: "AAPL",
    companies: false,
    chartData: false,
    chartTime: "5Y"
}

function reducer( state, action ) {
    switch(action.type){
        case 'ADD_RESPONSE':
            return {
                ...state,
                response: action.payload
            }
        case 'ADD_SYMBOL':
            return {
                ...state,
                symbol: action.payload,
            }
        case 'ADD_COMPANIES':
            return {
                ...state,
                companies: action.payload
            }
        case 'ADD_CHARTDATA':
            return {
                ...state,
                chartData: action.payload
            }
        case 'ADD_CHARTTIME':
            return {
                ...state,
                chartTime: action.payload
            }
        default:
            return state
    }
}

export const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const addResponseAction = (response) => ({
    type: 'ADD_RESPONSE',
    payload: response
})

export const addSymbolAction = (symbol) => ({
    type: 'ADD_SYMBOL',
    payload: symbol
})

export const addCompaniesAction = (companies) => ({
    type: 'ADD_SYMBOL',
    payload: companies
})

export const addChartDataAction = (chartData) => ({
    type: 'ADD_CHARTDATA',
    payload: chartData
})

export const addChartTimeAction = (chartTime) => ({
    type: 'ADD_CHARTTIME',
    payload: chartTime
})

