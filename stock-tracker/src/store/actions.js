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
  INITIAL_STARTUP,
  REQUEST_ERROR
} from "./actionTypes"

export const addResponseAction = response => ({
  type: ADD_RESPONSE,
  payload: response
});

export const addSymbolAction = symbol => ({
  type: ADD_SYMBOL,
  payload: symbol
});

export const addCompaniesAction = companies => ({
  type: ADD_COMPANIES,
  payload: companies
});

export const addCompanyOverviewAction = companyOverview => ({
  type: ADD_COMPANY_OVERVIEW,
  payload: companyOverview
});

export const addChartDataAction = chartData => ({
  type: ADD_CHARTDATA,
  payload: chartData
});

export const addLatestNewsAction = latestNews => ({
  type: ADD_NEWS,
  payload: latestNews
});
export const addChartTimeAction = chartTime => ({
  type: ADD_CHARTTIME,
  payload: chartTime
});
export const addTopPeersAction = topPeers => ({
  type: ADD_TOP_PEERS,
  payload: topPeers
});
export const addSearchInputAction = searchInput => ({
  type: ADD_SEARCH_INPUT,
  payload: searchInput
});
export const addSuggestionsAction = suggestions => ({
  type: ADD_SUGGESTIONS,
  payload: suggestions
});

export const initialStartupAction = () => ({ type: INITIAL_STARTUP });

export const getErrorsAction = (requestName, message) => ({ 
  type: REQUEST_ERROR,
  payload: {requestName, message}
})
//message is not used