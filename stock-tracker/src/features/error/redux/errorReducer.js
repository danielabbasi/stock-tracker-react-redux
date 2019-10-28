import { REQUEST_ERROR } from "./actionTypes";
  
const initialState = {
    error: {
      stockData: false,
      companies: false,
      companyOverview: false,
      latestNews: false,
      chartData: false,
      topPeers: false
    }
  };
  
  export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
      case REQUEST_ERROR: {
        return {
          ...state,
          error: {
            ...state.error,
            [action.payload.requestName]: true
          }
        };
      }
      default:
        return state;
    }
  }
  