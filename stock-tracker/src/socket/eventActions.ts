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
import {
  SetChartData,
  SetChartError,
  ChartData
} from "features/chart/redux/actions";
import {
  SetCompanyOverview,
  SetErrorCompanyOverview,
  CompanyOverviewData
} from "features/overview/redux/actions";
import {
  SetLatestNews,
  SetErrorNews,
  LatestNews
} from "features/latestNews/redux/actions";
import {
  SetResponse,
  SetErrorKeyStats,
  ResponseData
} from "features/keyStats/redux/actions";
import {
  SetSuggestions,
  SetSearchError,
  SearchData
} from "features/search/redux/actions";
import {
  SetTopPeers,
  SetErrorPeers,
  TopPeers
} from "features/topPeers/redux/actions";

export type Events = {
  [EventType.CHART_DATA]: {
    payload: ChartData[];
    action: SetChartData;
    errorAction: SetChartError;
  };
  [EventType.COMPANY_OVERVIEW]: {
    payload: CompanyOverviewData;
    action: SetCompanyOverview;
    errorAction: SetErrorCompanyOverview;
  };
  [EventType.LATEST_NEWS]: {
    payload: LatestNews;
    action: SetLatestNews;
    errorAction: SetErrorNews;
  };
  [EventType.STOCK_DATA]: {
    payload: ResponseData;
    action: SetResponse;
    errorAction: SetErrorKeyStats;
  };
  [EventType.SEARCH_INPUT]: {
    payload: SearchData;
    action: SetSuggestions;
    errorAction: SetSearchError;
  };
  [EventType.TOP_PEERS]: {
    payload: TopPeers;
    action: SetTopPeers;
    errorAction: SetErrorPeers;
  };
};

type Actions = Events[keyof Events]["action"];
type ErrorActions = Events[keyof Events]["errorAction"];
export type ApplicationActions = Actions | ErrorActions;

export type EventAction<E extends keyof Events> = {
  event: E;
  action: ActionCreator<Events[E]["action"]>;
  errorAction: ActionCreator<Events[E]["errorAction"]>;
};

export type EventActions = EventAction<keyof Events>[];

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
    event: EventType.SEARCH_INPUT,
    action: setSuggestionsAction,
    errorAction: setErrorSearchAction
  },
  {
    event: EventType.TOP_PEERS,
    action: addTopPeersAction,
    errorAction: setErrorPeersAction
  }
];
