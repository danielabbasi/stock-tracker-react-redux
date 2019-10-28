import { ADD_CHARTDATA, ADD_CHARTTIME } from "./actionTypes"

export const addChartDataAction = chartData => ({
    type: ADD_CHARTDATA,
    payload: chartData
  });

  export const addChartTimeAction = chartTime => ({
    type: ADD_CHARTTIME,
    payload: chartTime
  });