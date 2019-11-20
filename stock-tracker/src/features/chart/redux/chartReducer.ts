import {
  SET_CHART_DATA,
  SET_CHART_TIME,
  LOADING_CHART,
  SET_ERROR_CHART
} from "./actionTypes";
import { ChartActions, ChartData, ChartTime } from "./actions";
import { Reducer } from "redux";

export interface ChartState {
  chartData: ChartData[];
  chartTime: ChartTime;
  loading: boolean;
  error: boolean;
}
export const initialState: ChartState = {
  chartData: [],
  chartTime: "1Y",
  loading: false,
  error: false
};

export const chartReducer: Reducer<Readonly<ChartState>, ChartActions> = (
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
        ...state,
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
