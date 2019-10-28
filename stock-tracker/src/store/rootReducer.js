import { combineReducers } from "redux";
import { chartReducer } from "../features/chart/redux/chartReducer";
import { keyStatsReducer } from "../features/keyStats/redux/keyStatsReducer";
import { newsReducer } from "../features/latestNews/redux/newsReducer";
import { overviewReducer } from "../features/overview/redux/overviewReducer";
import { searchReducer } from "../features/search/redux/searchReducer";
import { peersReducer } from "../features/topPeers/redux/peersReducer";

export const rootReducer = combineReducers({
  chart: chartReducer,
  keyStats: keyStatsReducer,
  news: newsReducer,
  overview: overviewReducer,
  search: searchReducer,
  peers: peersReducer
});
