import {
    ADD_SYMBOL,
    ADD_SEARCH_INPUT,
    ADD_SUGGESTIONS,
  } from "./actionTypes";
  
  const initialState = {
    symbol: "",
    searchInput: "",
    suggestions: false,
  };
  
  export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_SYMBOL:
        return {
          ...state,
          symbol: action.payload,
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
  