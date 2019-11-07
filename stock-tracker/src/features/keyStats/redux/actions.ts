import {
  SET_RESPONSE,
  SET_LOADING_KEYSTATS,
  SET_ERROR_KEYSTATS
} from "./actionTypes";
import { Action, ActionWithPayload } from "../../../utils/actions";
import * as constants from "./actionTypes";

export interface ResponseData {
  latestPrice: number;
  change: number;
  changePercent: number;
  symbol: string;
  companyName: string;
  previousClose: number;
  high: number | null;
  low: number | null;
  previousVolume: number;
  marketCap: number;
  peRatio: number;
  open: number | null;
  week52High: number;
  week52Low: number;
  avgTotalVolume: number;
  earningsPerShare: number;
  ytdChange: number;
  currency: string | null;
  latestTime: string;
  latestUpdate: number;
  isUSMarketOpen: boolean;
}

export type SetResponse = ActionWithPayload<
  constants.SET_RESPONSE,
  ResponseData
>;

export const setResponseAction = (response: ResponseData): SetResponse => ({
  type: SET_RESPONSE,
  payload: response
});

export type SetLoadingKeyStats = Action<constants.SET_LOADING_KEYSTATS>;
export const setLoadingKeyStatsAction = (): SetLoadingKeyStats => ({
  type: SET_LOADING_KEYSTATS
});

export type SetErrorKeyStats = Action<constants.SET_ERROR_KEYSTATS>;
export const setErrorKeyStatsAction = (): SetErrorKeyStats => ({
  type: SET_ERROR_KEYSTATS
});

export type KeyStatsActions =
  | SetErrorKeyStats
  | SetLoadingKeyStats
  | SetResponse;
