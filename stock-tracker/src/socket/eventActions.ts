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

export type EventActions = EventAction<Events>[];

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

export type ApplicationActions = Actions | ErrorActions;

export type Events =
  | typeof EventType.CHART_DATA
  | typeof EventType.COMPANY_OVERVIEW
  | typeof EventType.LATEST_NEWS
  | typeof EventType.STOCK_DATA
  | typeof EventType.SUGGESTIONS
  | typeof EventType.TOP_PEERS;

export type EventActionsMap = {
  [EventType.CHART_DATA]: {
    payload: ChartData[];
    action: ActionCreator<SetChartData>;
    errorAction: ActionCreator<SetChartError>;
  };
  [EventType.COMPANY_OVERVIEW]: {
    payload: CompanyOverviewData;
    action: ActionCreator<SetCompanyOverview>;
    errorAction: ActionCreator<SetErrorCompanyOverview>;
  };
  [EventType.LATEST_NEWS]: {
    payload: LatestNews;
    action: ActionCreator<SetLatestNews>;
    errorAction: ActionCreator<SetErrorNews>;
  };
  [EventType.STOCK_DATA]: {
    payload: ResponseData;
    action: ActionCreator<SetResponse>;
    errorAction: ActionCreator<SetErrorKeyStats>;
  };
  [EventType.SUGGESTIONS]: {
    payload: SearchData;
    action: ActionCreator<SetSuggestions>;
    errorAction: ActionCreator<SetSearchError>;
  };
  [EventType.TOP_PEERS]: {
    payload: TopPeers;
    action: ActionCreator<SetTopPeers>;
    errorAction: ActionCreator<SetErrorPeers>;
  };
};
export type EventAction<E extends keyof EventActionsMap> = {
  event: E;
  action: EventActionsMap[E]["action"];
  errorAction: EventActionsMap[E]["errorAction"];
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
