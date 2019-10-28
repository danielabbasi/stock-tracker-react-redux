import {
  ADD_RESPONSE,
  ADD_SYMBOL,
  ADD_COMPANIES,
  ADD_COMPANY_OVERVIEW,
  ADD_NEWS,
  ADD_TOP_PEERS,
  ADD_SEARCH_INPUT,
  ADD_SUGGESTIONS,
} from "./actionTypes";

const initialState = {
  response: false,
  symbol: "",
  companies: false,
  latestNews: [],
  companyOverview: false,
  topPeers: [],
  loading: 0,
  searchInput: "",
  suggestions: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESPONSE:
      return {
        ...state,
        response: action.payload,
        loading: state.loading - 1
      };
    case ADD_SYMBOL:
      return {
        ...state,
        loading: 5,
        symbol: action.payload,
        response: false,
        latestNews: [],
        chartData: [],
        companyOverview: false,
        topPeers: [],
      };
    case ADD_COMPANIES:
      return {
        ...state,
        companies: action.payload
      };
    case ADD_COMPANY_OVERVIEW:
      return {
        ...state,
        companyOverview: action.payload,
        loading: state.loading - 1
      };
    case ADD_NEWS:
      return {
        ...state,
        latestNews: action.payload,
        loading: state.loading - 1
      };
    case ADD_TOP_PEERS:
      return {
        ...state,
        topPeers: action.payload,
        loading: state.loading - 1
      };
    case ADD_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.payload
      };
    case ADD_SUGGESTIONS:
      return {
        ...state,
        suggestions: action.payload
      };
    default:
      return state;
  }
}
