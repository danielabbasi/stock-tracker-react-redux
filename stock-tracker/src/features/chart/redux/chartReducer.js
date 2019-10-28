import {
    ADD_RESPONSE,
    ADD_SYMBOL,
    ADD_COMPANIES,
    ADD_COMPANY_OVERVIEW,
    ADD_CHARTDATA,
    ADD_NEWS,
    ADD_CHARTTIME,
    ADD_TOP_PEERS,
    ADD_SEARCH_INPUT,
    ADD_SUGGESTIONS,
    REQUEST_ERROR
  } from "./actionTypes";
  
  const initialState = {
    response: false,
    symbol: "",
    companies: false,
    latestNews: [],
    chartData: [],
    chartTime: "1Y",
    companyOverview: false,
    topPeers: [],
    loading: 0,
    searchInput: "",
    suggestions: false,
    error: {
      stockData: false,
      companies: false,
      companyOverview: false,
      latestNews: false,
      chartData: false,
      topPeers: false
    }
  };
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case ADD_CHARTDATA:
        return {
          ...state,
          chartData: action.payload,
          loading: state.loading - 1
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
  