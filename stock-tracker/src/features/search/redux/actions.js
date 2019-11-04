import {
  ADD_SYMBOL,
  ADD_SEARCH_INPUT,
  ADD_SUGGESTIONS,
  SET_ERROR_SEARCH
} from "./actionTypes";

export const setSymbolAction = symbol => ({
  type: ADD_SYMBOL,
  payload: symbol
});

export const setSearchInputAction = searchInput => ({
  type: ADD_SEARCH_INPUT,
  payload: searchInput
});

export const setSuggestionsAction = suggestions => ({
  type: ADD_SUGGESTIONS,
  payload: suggestions
});

export const setErrorSearchAction = () => ({ type: SET_ERROR_SEARCH });
