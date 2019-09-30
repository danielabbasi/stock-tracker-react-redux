import { createStore, applyMiddleware, compose } from 'redux';
import { reducer } from './reducer'

const initialState = {
    response: false,
    symbol: "AAPL",
    companies: false,
    latestNews: [],
    chartData: [],
    chartTime: "5Y"
}

const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware], next state', store.getState());
            return result
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    initialState,
    composeEnhancers(
        applyMiddleware(logger)
    )
);


