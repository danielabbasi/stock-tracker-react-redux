import { ADD_SYMBOL, ADD_SEARCH_INPUT, ADD_SUGGESTIONS } from "./actionTypes";

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
