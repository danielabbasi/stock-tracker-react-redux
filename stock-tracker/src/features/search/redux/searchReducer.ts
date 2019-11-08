import {
  ADD_SYMBOL,
  ADD_SEARCH_INPUT,
  ADD_SUGGESTIONS,
  SET_ERROR_SEARCH
} from "./actionTypes";
import { SearchData, SearchActions } from "./actions";
import { Reducer } from "redux";

export type SearchState = {
  symbol: string;
  searchInput: string;
  suggestions?: SearchData[];
  error: boolean;
};

const initialState: SearchState = {
  symbol: "",
  searchInput: "",
  suggestions: undefined,
  error: false
};

export const searchReducer: Reducer<SearchState, SearchActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_SYMBOL:
      return {
        ...state,
        symbol: action.payload,
        error: false
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
    case SET_ERROR_SEARCH:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};
