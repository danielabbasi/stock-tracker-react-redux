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
import { ActionCreator } from "redux";
import { SetChartData, SetChartError } from "features/chart/redux/actions";
import {
  SetCompanyOverview,
  SetErrorCompanyOverview
} from "features/overview/redux/actions";
import { SetLatestNews, SetErrorNews } from "features/latestNews/redux/actions";
import { SetResponse, SetErrorKeyStats } from "features/keyStats/redux/actions";
import { SetSuggestions, SetSearchError } from "features/search/redux/actions";
import { SetTopPeers, SetErrorPeers } from "features/topPeers/redux/actions";

export type EventActions = EventAction[];

export type Actions =
  | SetChartData
  | SetCompanyOverview
  | SetLatestNews
  | SetResponse
  | SetSuggestions
  | SetTopPeers;

export type ErrorActions =
  | SetChartError
  | SetErrorCompanyOverview
  | SetErrorNews
  | SetErrorKeyStats
  | SetSearchError
  | SetErrorPeers;

export type Events =
  | typeof EventType.CHART_DATA
  | typeof EventType.COMPANY_OVERVIEW
  | typeof EventType.LATEST_NEWS
  | typeof EventType.STOCK_DATA
  | typeof EventType.SUGGESTIONS
  | typeof EventType.TOP_PEERS;

type EventAction = {
  event: Events;
  action: ActionCreator<Actions>;
  errorAction: ActionCreator<ErrorActions>;
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
