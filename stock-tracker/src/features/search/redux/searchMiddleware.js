import { setChartLoadingAction } from "../../chart";
import { setLoadingOverviewAction } from "../../overview";
import { setLoadingNewsAction } from "../../latestNews";
import { setLoadingKeyStatsAction } from "../../keyStats";
import { setLoadingPeersAction } from "../../topPeers";
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
  const socket = socketService.create();
  if (action.type === ADD_SYMBOL) {
    socket.emit(SYMBOL_INPUT, action.payload, store.getState().chart.chartTime);
    store.dispatch(setChartLoadingAction());
    store.dispatch(setLoadingKeyStatsAction());
    store.dispatch(setLoadingNewsAction());
    store.dispatch(setLoadingOverviewAction());
    store.dispatch(setLoadingPeersAction());
  } else if (action.type === ADD_SEARCH_INPUT) {
    socket.emit(SEARCH_INPUT, action.payload);
    socketService.createSocketSubscription(SUGGESTIONS, suggestions => {
      store.dispatch(setSuggestionsAction(suggestions));
    });
  }
  return next(action);
};
