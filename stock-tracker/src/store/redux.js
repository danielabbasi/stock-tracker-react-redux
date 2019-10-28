import { createStore, applyMiddleware, compose } from "redux";
import {rootReducer} from "./rootReducer"
import {
  addResponseAction,
  addCompaniesAction,
  addLatestNewsAction,
  initialStartupAction,
  addCompanyOverviewAction,
  addTopPeersAction,
  addSuggestionsAction,
} from "./actions";
import {addChartDataAction} from "../features/chart/redux/actions"
import {getErrorsAction} from "../features/error/redux/actions"

const io = require("socket.io-client");
const socket = io(`http://${window.location.hostname}:5000`);

const stockMiddleware = store => next => action => {
  const result = next(action);
  if (action.type === "ADD_SYMBOL") {
    socket.emit("symbol", store.getState().symbol, store.getState().chartTime);
    socket.on("StockData", data => {
      store.dispatch(addResponseAction(data));
    });
    socket.on("CompanyOverview", overview => {
      store.dispatch(addCompanyOverviewAction(overview));
    });
    socket.on("LatestNews", news => {
      store.dispatch(addLatestNewsAction(news));
    });
    socket.on("ChartData", chartData => {
      store.dispatch(addChartDataAction(chartData));
    });
    socket.on("TopPeers", peers => {
      store.dispatch(addTopPeersAction(peers));
    });
    socket.on("StockError", error => {
      store.dispatch(getErrorsAction("stockData", error));
    });
    socket.on("CompaniesError", error => {
      store.dispatch(getErrorsAction("companies", error));
    });
    socket.on("CompanyOverviewError", error => {
      store.dispatch(getErrorsAction("companyOverview", error));
    });
    socket.on("LatestNewsError", error => {
      store.dispatch(getErrorsAction("latestNews", error));
    });
    socket.on("ChartDataError", error => {
      store.dispatch(getErrorsAction("chartData", error));
    });
    socket.on("TopPeersError", error => {
      store.dispatch(getErrorsAction("topPeers", error));
    });
  } else if (action.type === "ADD_CHARTTIME") {
    socket.emit(
      "chartTime",
      store.getState().symbol,
      store.getState().chartTime
    );
    store.dispatch(addChartDataAction(store.getState().chartData));
  } else if (action.type === "ADD_SEARCH_INPUT") {
    socket.emit("search", store.getState().searchInput);
    socket.on("suggestions", suggestions => {
      store.dispatch(addSuggestionsAction(suggestions));
    });
  }
  return result;
};

const initialStartupMiddlware = store => next => action => {
  if (action.type === "INITIAL_STARTUP") {
    console.log("Application has started ");
    socket.on("companies", companies => {
      store.dispatch(addCompaniesAction(companies));
    });
  }
  const result = next(action);
  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(initialStartupMiddlware, stockMiddleware))
);

store.dispatch(initialStartupAction());
