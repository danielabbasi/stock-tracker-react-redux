import {
  setChartDataAction,
  setChartErrorAction
} from "../features/chart/redux/actions";
import {
  setCompanyOverviewAction,
  setErrorOverviewAction
} from "../features/overview/redux/actions";
import {
  setLatestNewsAction,
  setErrorNewsAction
} from "../features/latestNews/redux/actions";
import {
  setResponseAction,
  setErrorKeyStatsAction
} from "../features/keyStats/redux/actions";
import {
  addTopPeersAction,
  setErrorPeersAction
} from "../features/topPeers/redux/actions";
import { setSuggestionsAction } from "../features/search/redux/actions";
import { socketService } from "../socket";

export const getTopSubscription = dispatch => {
  const unsubscribeFns = [
    ["StockData", setResponseAction],
    ["CompanyOverview", setCompanyOverviewAction],
    ["LatestNews", setLatestNewsAction],
    ["suggestions", setSuggestionsAction],
    ["ChartData", setChartDataAction],
    ["TopPeers", addTopPeersAction],
    ["StockError", error => setErrorKeyStatsAction("stockData", error)],
    [
      "CompanyOverviewError",
      error => setErrorOverviewAction("companiesOverview", error)
    ],
    ["LatestNewsError", error => setErrorNewsAction("latestNews", error)],
    ["ChartDataError", error => setChartErrorAction("chartData", error)],
    ["TopPeersError", error => setErrorPeersAction("topPeers", error)]
  ].map(([event, actionCreator]) =>
    socketService.getSocketSubscription(event, payload =>
      dispatch(actionCreator(payload))
    )
  );
  return () => unsubscribeFns.forEach(fn => fn());
};
