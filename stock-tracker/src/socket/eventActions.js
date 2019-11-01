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
import { setSuggestionsAction } from "../features/search";

export const eventActions = [
  [EventType.STOCK_DATA, setResponseAction],
  [EventType.COMPANY_OVERVIEW, setCompanyOverviewAction],
  [EventType.LATEST_NEWS, setLatestNewsAction],
  [EventType.SUGGESTIONS, setSuggestionsAction],
  [EventType.CHART_DATA, setChartDataAction],
  [EventType.TOP_PEERS, addTopPeersAction],
  [EventType.STOCK_ERROR, error => setErrorKeyStatsAction("stockData", error)],
  [
    EventType.COMPANY_OVERVIEW_ERROR,
    error => setErrorOverviewAction("companiesOverview", error)
  ],
  [
    EventType.LATEST_NEWS_ERROR,
    error => setErrorNewsAction("latestNews", error)
  ],
  [
    EventType.CHART_DATA_ERROR,
    error => setChartErrorAction("chartData", error)
  ],
  [EventType.TOP_PEERS_ERROR, error => setErrorPeersAction("topPeers", error)]
];
