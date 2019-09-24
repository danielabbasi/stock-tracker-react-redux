import { createStore } from 'redux';

const initialState = {
    response: false,
    symbol: ""
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