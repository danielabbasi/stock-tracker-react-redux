import {
  SET_CHART_DATA,
  SET_CHART_TIME,
  LOADING_CHART,
  SET_ERROR_CHART
} from "./actionTypes";
import * as constants from "./actionTypes";

export interface ChartData {
  close: number;
  date: string;
}

export interface setChartData {
  type: constants.SET_CHART_DATA;
  payload: ChartData;
}

export interface setChartTime {
  type: constants.SET_CHART_TIME;
  payload: string;
}

export interface setChartLoading {
  type: constants.LOADING_CHART;
}

export interface setChartError {
  type: constants.SET_ERROR_CHART;
}

export type ChartActions =
  | setChartLoading
  | setChartData
  | setChartError
  | setChartTime;

export const setChartDataAction = (chartData: ChartData): setChartData => ({
  type: SET_CHART_DATA,
  payload: chartData
});

export const setChartTimeAction = (chartTime: string): setChartTime => ({
  type: SET_CHART_TIME,
  payload: chartTime
});

export const setChartLoadingAction = (): setChartLoading => ({
  type: LOADING_CHART
});

export const setChartErrorAction = (): setChartError => ({
  type: SET_ERROR_CHART
});
