import { setChartLoadingAction } from "../../chart";
import { setLoadingOverviewAction } from "../../overview";
import { setLoadingNewsAction } from "../../latestNews";
import { setLoadingKeyStatsAction } from "../../keyStats";
import { setLoadingPeersAction } from "../../topPeers";
import { ADD_SYMBOL, ADD_SEARCH_INPUT } from "./actionTypes";
import {
  SEARCH_INPUT,
  LATEST_NEWS,
  TOP_PEERS,
  COMPANY_OVERVIEW,
  STOCK_DATA,
  CHART_DATA
} from "../../../socket/eventTypes";
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
    // socket.emit(SYMBOL_INPUT, action.payload, store.getState().chart.chartTime);
    socket.emit(TOP_PEERS, action.payload);
    socket.emit(LATEST_NEWS, action.payload);
    socket.emit(COMPANY_OVERVIEW, action.payload);
    socket.emit(STOCK_DATA, action.payload);
    socket.emit(CHART_DATA, action.payload, store.getState().chart.chartTime);
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
