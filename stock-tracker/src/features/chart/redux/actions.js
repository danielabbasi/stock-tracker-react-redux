import { SET_CHART_DATA, SET_CHART_TIME, LOADING_CHART } from "./actionTypes";

export const addChartDataAction = chartData => ({
  type: SET_CHART_DATA,
  payload: chartData
});

export const addChartTimeAction = chartTime => ({
  type: SET_CHART_TIME,
  payload: chartTime
});

export const setChartLoadingAction = () => ({
  type: LOADING_CHART
});
