import {
  SET_CHART_DATA,
  SET_CHART_TIME,
  LOADING_CHART,
  SET_ERROR_CHART
} from "./actionTypes";
import { Action, ActionWithPayload } from "utils/actions";

export interface ChartData {
  close: number;
  date: string;
}

export type ChartTime = "1D" | "5D" | "1M" | "1Y" | "5Y" | "MAX";

export type SetChartData = ActionWithPayload<
  typeof SET_CHART_DATA,
  ChartData[]
>;

export type SetChartTime = ActionWithPayload<typeof SET_CHART_TIME, ChartTime>;

export type SetChartLoading = Action<typeof LOADING_CHART>;

export type SetChartError = Action<typeof SET_ERROR_CHART>;

export type ChartActions =
  | SetChartLoading
  | SetChartData
  | SetChartError
  | SetChartTime;

export const setChartDataAction = (chartData: ChartData[]): SetChartData => ({
  type: SET_CHART_DATA,
  payload: chartData
});

export const setChartTimeAction = (chartTime: ChartTime): SetChartTime => ({
  type: SET_CHART_TIME,
  payload: chartTime
});

export const setChartLoadingAction = (): SetChartLoading => ({
  type: LOADING_CHART
});

export const setChartErrorAction = (): SetChartError => ({
  type: SET_ERROR_CHART
});
