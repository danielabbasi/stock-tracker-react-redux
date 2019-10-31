import { setChartLoadingAction } from "../features/chart/redux/actions";
import { setLoadingOverviewAction } from "../features/overview/redux/actions";
import { setLoadingNewsAction } from "../features/latestNews/redux/actions";
import { setLoadingKeyStatsAction } from "../features/keyStats/redux/actions";
import { setLoadingPeersAction } from "../features/topPeers/redux/actions";
import { setSuggestionsAction } from "../features/search/redux/actions";
import {
  ADD_SYMBOL,
  ADD_SEARCH_INPUT
} from "../features/search/redux/actionTypes";
import { SET_CHART_TIME } from "../features/chart/redux/actionTypes";
import { INITIAL_STARTUP } from "./actionTypes";
import { getTopSubscription } from "./subscriptions";

export const searchMiddleware = socketService => store => next => action => {
  const result = next(action);
  if (action.type === ADD_SYMBOL) {
    socketService
      .create()
      .emit(
        "symbol",
        store.getState().search.symbol,
        store.getState().chart.chartTime
      );
    store.dispatch(setChartLoadingAction());
    store.dispatch(setLoadingKeyStatsAction());
    store.dispatch(setLoadingNewsAction());
    store.dispatch(setLoadingOverviewAction());
    store.dispatch(setLoadingPeersAction());
  } else if (action.type === ADD_SEARCH_INPUT) {
    socketService.create().emit("search", store.getState().search.searchInput);
    socketService.create().on("suggestions", suggestions => {
      store.dispatch(setSuggestionsAction(suggestions));
    });
  }
  return result;
};

export const chartMiddleware = socketService => store => next => action => {
  const result = next(action);
  if (action.type === SET_CHART_TIME) {
    socketService
      .create()
      .emit(
        "chartTime",
        store.getState().search.symbol,
        store.getState().chart.chartTime
      );
  }
  return result;
};

export const initialStartupMiddlware = socketService => store => next => action => {
  if (action.type === INITIAL_STARTUP) {
    console.info("Application has started ");
    getTopSubscription(store.dispatch);
  }
  const result = next(action);
  return result;
};
