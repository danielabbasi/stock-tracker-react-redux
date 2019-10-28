import { SET_CHART_DATA, SET_CHART_TIME, LOADING_CHART } from "./actionTypes";

export const setChartDataAction = chartData => ({
  type: SET_CHART_DATA,
  payload: chartData
});

export const setChartTimeAction = chartTime => ({
  type: SET_CHART_TIME,
  payload: chartTime
});

export const setChartLoadingAction = () => ({
  type: LOADING_CHART
});
