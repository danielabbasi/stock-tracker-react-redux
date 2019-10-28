import { ADD_CHARTDATA, ADD_CHARTTIME } from "./actionTypes";
import { REQUEST_ERROR } from "../../../store/actionTypes"
  
  const initialState = {
    chartData: [],
    chartTime: "1Y",
    loading: true,
    error: false
  };
  
  export const chartReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_CHARTDATA:
        return {
          ...state,
          chartData: action.payload,
          loading: false
        };
      case ADD_CHARTTIME:
        return {
          ...state,
          chartTime: action.payload
        };
        case REQUEST_ERROR: {
          return {
            ...state,
            error: true
          };
        }
      default:
        return state;
    }
  }
  