import { createStore, applyMiddleware, compose } from "redux";
import { reducer } from "./reducer";
import {
  addResponseAction,
  addCompaniesAction,
  addChartDataAction,
  addLatestNewsAction,
} from "./actions";

const io = require("socket.io-client");
const socket = io("http://127.0.0.1:5000");

const initialState = {
  response: false,
  symbol: "AAPL",
  companies: false,
  latestNews: [],
  chartData: [],
  chartTime: "5Y"
};

const stockMiddleware = store => next => action => {
  if (action.type === "ADD_SYMBOL") {
    next(action)
    socket.emit("symbol", store.getState().symbol, store.getState().chartTime);
    socket.on("FromAPI", (data, chart, news) => {
      store.dispatch(addResponseAction(data));
      store.dispatch(addChartDataAction(chart));
      store.dispatch(addLatestNewsAction(news));
    });
  } else if (action.type === "ADD_CHARTTIME") {
      next(action)
      socket.emit("chartTime", store.getState().symbol, store.getState().chartTime)
      store.dispatch(addChartDataAction(store.getState().chartData))
  }
  const result = next(action);
  return result;
};

// TODO: CREATE INITIAL STARTUP MIDDLEWARE

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(stockMiddleware))
);
