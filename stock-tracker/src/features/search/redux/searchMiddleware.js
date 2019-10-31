import { setChartLoadingAction } from "../../chart/redux/actions";
import { setLoadingOverviewAction } from "../../overview/redux/actions";
import { setLoadingNewsAction } from "../../latestNews/redux/actions";
import { setLoadingKeyStatsAction } from "../../keyStats/redux/actions";
import { setLoadingPeersAction } from "../../topPeers/redux/actions";
import { setSuggestionsAction } from "./actions";
import { ADD_SYMBOL, ADD_SEARCH_INPUT } from "./actionTypes";
import {
  SYMBOL_INPUT,
  SEARCH_INPUT,
  SUGGESTIONS
} from "../../../socket/eventTypes";

export const searchMiddleware = ({
  socketService
}) => store => next => action => {
  const result = next(action);
  if (action.type === ADD_SYMBOL) {
    socketService
      .create()
      .emit(
        SYMBOL_INPUT,
        store.getState().search.symbol,
        store.getState().chart.chartTime
      );
    store.dispatch(setChartLoadingAction());
    store.dispatch(setLoadingKeyStatsAction());
    store.dispatch(setLoadingNewsAction());
    store.dispatch(setLoadingOverviewAction());
    store.dispatch(setLoadingPeersAction());
  } else if (action.type === ADD_SEARCH_INPUT) {
    socketService
      .create()
      .emit(SEARCH_INPUT, store.getState().search.searchInput);
    socketService.create().on(SUGGESTIONS, suggestions => {
      store.dispatch(setSuggestionsAction(suggestions));
    });
  }
  return result;
};
