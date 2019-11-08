import {
  ADD_SYMBOL,
  ADD_SEARCH_INPUT,
  ADD_SUGGESTIONS,
  SET_ERROR_SEARCH
} from "./actionTypes";
import { ActionWithPayload, Action } from "../../../utils/actions";

export type Suggestions = string[];

export type SetSymbol = ActionWithPayload<typeof ADD_SYMBOL, string>;

export const setSymbolAction = (symbol: string): SetSymbol => ({
  type: ADD_SYMBOL,
  payload: symbol
});

export type SetSearchInput = ActionWithPayload<typeof ADD_SEARCH_INPUT, string>;

export const setSearchInputAction = (searchInput: string): SetSearchInput => ({
  type: ADD_SEARCH_INPUT,
  payload: searchInput
});

export type SetSuggestions = ActionWithPayload<
  typeof ADD_SUGGESTIONS,
  Suggestions
>;

export const setSuggestionsAction = (
  suggestions: Suggestions
): SetSuggestions => ({
  type: ADD_SUGGESTIONS,
  payload: suggestions
});

export type SetSearchError = Action<typeof SET_ERROR_SEARCH>;

export const setErrorSearchAction = (): SetSearchError => ({
  type: SET_ERROR_SEARCH
});

export type SearchActions =
  | SetSymbol
  | SetSearchInput
  | SetSuggestions
  | SetSearchError;
