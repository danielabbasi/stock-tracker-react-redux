import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./rootReducer";
import {
  setChartDataAction,
  setChartLoadingAction,
  setChartErrorAction
} from "../features/chart/redux/actions";
import {
  setCompanyOverviewAction,
  setLoadingOverviewAction,
  setErrorOverviewAction
} from "../features/overview/redux/actions";
import {
  setLatestNewsAction,
  setLoadingNewsAction,
  setErrorNewsAction
} from "../features/latestNews/redux/actions";
import {
  setResponseAction,
  setLoadingKeyStatsAction,
  setErrorKeyStatsAction
} from "../features/keyStats/redux/actions";
import {
  addTopPeersAction,
  setLoadingPeersAction,
  setErrorPeersAction
} from "../features/topPeers/redux/actions";
import { setSuggestionsAction } from "../features/search/redux/actions";
import {
  ADD_SYMBOL,
  ADD_SEARCH_INPUT
} from "../features/search/redux/actionTypes";
import { SET_CHART_TIME } from "../features/chart/redux/actionTypes";
import { INITIAL_STARTUP } from "../store/actionTypes";

import io from "socket.io-client";

const socket = io(`http://${window.location.hostname}:5000`);

const stockMiddleware = store => next => action => {
  const result = next(action);
  if (action.type === ADD_SYMBOL) {
    socket.emit(
      "symbol",
      store.getState().search.symbol,
      store.getState().chart.chartTime
    );
    store.dispatch(setChartLoadingAction());
    store.dispatch(setLoadingKeyStatsAction());
    store.dispatch(setLoadingNewsAction());
    store.dispatch(setLoadingOverviewAction());
    store.dispatch(setLoadingPeersAction());
  } else if (action.type === SET_CHART_TIME) {
    socket.emit(
      "chartTime",
      store.getState().search.symbol,
      store.getState().chart.chartTime
    );
  } else if (action.type === ADD_SEARCH_INPUT) {
    socket.emit("search", store.getState().search.searchInput);
    socket.on("suggestions", suggestions => {
      store.dispatch(setSuggestionsAction(suggestions));
    });
  }
  return result;
};

const initialStartupMiddlware = store => next => action => {
  if (action.type === INITIAL_STARTUP) {
    console.log("Application has started ");
    socket.on("StockData", data => {
      store.dispatch(setResponseAction(data));
    });
    socket.on("CompanyOverview", overview => {
      store.dispatch(setCompanyOverviewAction(overview));
    });
    socket.on("LatestNews", news => {
      store.dispatch(setLatestNewsAction(news));
    });
    socket.on("ChartData", chartData => {
      store.dispatch(setChartDataAction(chartData));
    });
    socket.on("TopPeers", peers => {
      store.dispatch(addTopPeersAction(peers));
    });
    socket.on("StockError", error => {
      store.dispatch(setErrorKeyStatsAction("stockData", error));
    });
    // socket.on("CompaniesError", error => {
    //   store.dispatch(getErrorsAction("companies", error));
    // });
    socket.on("CompanyOverviewError", error => {
      store.dispatch(setErrorOverviewAction("companyOverview", error));
    });
    socket.on("LatestNewsError", error => {
      store.dispatch(setErrorNewsAction("latestNews", error));
    });
    socket.on("ChartDataError", error => {
      store.dispatch(setChartErrorAction("chartData", error));
    });
    socket.on("TopPeersError", error => {
      store.dispatch(setErrorPeersAction("topPeers", error));
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
