import { SET_CHART_DATA, SET_CHART_TIME, LOADING_CHART } from "./actionTypes";

const initialState = {
  chartData: [],
  chartTime: "1Y",
  loading: false
};

export const chartReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};
