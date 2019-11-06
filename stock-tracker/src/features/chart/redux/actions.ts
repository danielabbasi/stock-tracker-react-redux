import {
  SET_CHART_DATA,
  SET_CHART_TIME,
  LOADING_CHART,
  SET_ERROR_CHART
} from "./actionTypes";
import { Action, ActionWithPayload } from "../../../utils/actions";
import * as constants from "./actionTypes";

export interface ChartData {
  close: number;
  date: string;
}

export type SetChartData = ActionWithPayload<
  constants.SET_CHART_DATA,
  ChartData[]
>;

export type SetChartTime = ActionWithPayload<constants.SET_CHART_TIME, string>;

export type SetChartLoading = Action<constants.LOADING_CHART>;

export type SetChartError = Action<constants.SET_ERROR_CHART>;

export type ChartActions =
  | SetChartLoading
  | SetChartData
  | SetChartError
  | SetChartTime;

export const setChartDataAction = (chartData: ChartData[]): SetChartData => ({
  type: SET_CHART_DATA,
  payload: chartData
});

export const setChartTimeAction = (chartTime: string): SetChartTime => ({
  type: SET_CHART_TIME,
  payload: chartTime
});

export const setChartLoadingAction = (): SetChartLoading => ({
  type: LOADING_CHART
});

export const setChartErrorAction = (): SetChartError => ({
  type: SET_ERROR_CHART
});
