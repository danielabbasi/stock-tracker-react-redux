import { ADD_CHARTDATA, ADD_CHARTTIME } from "./actionTypes";
  
  const initialState = {
    chartData: [],
    chartTime: "1Y",
  };
  
  export const chartReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_CHARTDATA:
        return {
          ...state,
          chartData: action.payload,
        };
      case ADD_CHARTTIME:
        return {
          ...state,
          chartTime: action.payload
        };
      default:
        return state;
    }
  }
  