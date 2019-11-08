import * as EventType from "./eventTypes";
import { setChartDataAction, setChartErrorAction } from "../features/chart";
import {
  setCompanyOverviewAction,
  setErrorOverviewAction
} from "../features/overview";
import {
  setLatestNewsAction,
  setErrorNewsAction
} from "../features/latestNews";
import {
  setResponseAction,
  setErrorKeyStatsAction
} from "../features/keyStats";
import { addTopPeersAction, setErrorPeersAction } from "../features/topPeers";
import { setSuggestionsAction, setErrorSearchAction } from "../features/search";
import { AnyAction } from "redux";

type EventActions = EventAction[];

type EventAction = {
  event: string;
  action: (input: any) => AnyAction;
  errorAction: (input: boolean) => AnyAction;
};

export const eventActions: EventActions = [
  {
    event: EventType.CHART_DATA,
    action: setChartDataAction,
    errorAction: setChartErrorAction
  },
  {
    event: EventType.COMPANY_OVERVIEW,
    action: setCompanyOverviewAction,
    errorAction: setErrorOverviewAction
  },
  {
    event: EventType.LATEST_NEWS,
    action: setLatestNewsAction,
    errorAction: setErrorNewsAction
  },
  {
    event: EventType.STOCK_DATA,
    action: setResponseAction,
    errorAction: setErrorKeyStatsAction
  },
  {
    event: EventType.SUGGESTIONS,
    action: setSuggestionsAction,
    errorAction: setErrorSearchAction
  },
  {
    event: EventType.TOP_PEERS,
    action: addTopPeersAction,
    errorAction: setErrorPeersAction
  }
];
