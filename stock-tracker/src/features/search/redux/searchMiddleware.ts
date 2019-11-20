import { setChartLoadingAction } from "../../chart";
import { setLoadingOverviewAction } from "../../overview";
import { setLoadingNewsAction } from "../../latestNews";
import { setLoadingKeyStatsAction } from "../../keyStats";
import { setLoadingPeersAction } from "../../topPeers";
import { ADD_SYMBOL, ADD_SEARCH_INPUT } from "./actionTypes";
import { SYMBOL_INPUT, SEARCH_INPUT } from "../../../socket/eventTypes";
import { Middleware } from "redux";
import { AppState } from "store/rootReducer";

type ChartState = Pick<AppState, "chart">;

export interface SearchSocketServiceDependency {
  socketService: {
    create: () => {
      emit: (event: string, actionPayload: string, store?: string) => void;
    };
  };
}

export const searchMiddleware = ({
  socketService
}: SearchSocketServiceDependency): Middleware<
  {},
  ChartState
> => store => next => action => {
  if (action.type === ADD_SYMBOL) {
    const socket = socketService.create();
    socket.emit(SYMBOL_INPUT, action.payload, store.getState().chart.chartTime);
    store.dispatch(setChartLoadingAction());
    store.dispatch(setLoadingKeyStatsAction());
    store.dispatch(setLoadingNewsAction());
    store.dispatch(setLoadingOverviewAction());
    store.dispatch(setLoadingPeersAction());
  } else if (action.type === ADD_SEARCH_INPUT) {
    const socket = socketService.create();
    socket.emit(SEARCH_INPUT, action.payload);
  }
  return next(action);
};
