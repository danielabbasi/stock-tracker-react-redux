import {
  ADD_SYMBOL,
  ADD_SEARCH_INPUT,
  ADD_SUGGESTIONS,
  SET_ERROR_SEARCH
} from "./actionTypes";

const initialState = {
  symbol: "",
  searchInput: "",
  suggestions: false,
  error: false
};

export const searchReducer = (state = initialState, action) => {
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
