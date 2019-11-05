import {
  SET_CHART_DATA,
  SET_CHART_TIME,
  LOADING_CHART,
  SET_ERROR_CHART
} from "./actionTypes";
import { ChartActions, ChartData } from "./actions";
import { Reducer } from "redux";

export interface ChartState {
  chartData: ChartData[] | boolean;
  chartTime: string;
  loading: boolean;
  error: boolean;
}
export const initialState: ChartState = {
  chartData: false,
  chartTime: "1Y",
  loading: false,
  error: false
};

export const chartReducer: Reducer<ChartState, ChartActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOADING_CHART:
      return {
        ...initialState,
        loading: true
      };
    case SET_CHART_DATA:
      return {
        ...state,
        chartData: action.payload,
        loading: false
      };
    case SET_CHART_TIME:
      return {
        ...initialState,
        chartTime: action.payload,
        loading: true
      };
    case SET_ERROR_CHART:
      return {
        ...state,
        error: true,
        loading: false
      };
    default:
      return state;
  }
};
