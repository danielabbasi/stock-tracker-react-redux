import { ADD_SYMBOL, ADD_SEARCH_INPUT, ADD_SUGGESTIONS } from "./actionTypes";

export const addSymbolAction = symbol => ({
  type: ADD_SYMBOL,
  payload: symbol
});

export const addSearchInputAction = searchInput => ({
  type: ADD_SEARCH_INPUT,
  payload: searchInput
});
export const addSuggestionsAction = suggestions => ({
  type: ADD_SUGGESTIONS,
  payload: suggestions
});
