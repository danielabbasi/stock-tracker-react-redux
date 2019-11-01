import {
  STOCK_DATA,
  COMPANY_OVERVIEW,
  LATEST_NEWS,
  SUGGESTIONS,
  CHART_DATA,
  TOP_PEERS,
  COMPANY_OVERVIEW_ERROR,
  LATEST_NEWS_ERROR,
  CHART_DATA_ERROR,
  TOP_PEERS_ERROR,
  STOCK_ERROR
} from "./eventTypes";
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
  [STOCK_DATA, setResponseAction],
  [COMPANY_OVERVIEW, setCompanyOverviewAction],
  [LATEST_NEWS, setLatestNewsAction],
  [SUGGESTIONS, setSuggestionsAction],
  [CHART_DATA, setChartDataAction],
  [TOP_PEERS, addTopPeersAction],
  [STOCK_ERROR, error => setErrorKeyStatsAction("stockData", error)],
  [
    COMPANY_OVERVIEW_ERROR,
    error => setErrorOverviewAction("companiesOverview", error)
  ],
  [LATEST_NEWS_ERROR, error => setErrorNewsAction("latestNews", error)],
  [CHART_DATA_ERROR, error => setChartErrorAction("chartData", error)],
  [TOP_PEERS_ERROR, error => setErrorPeersAction("topPeers", error)]
];
