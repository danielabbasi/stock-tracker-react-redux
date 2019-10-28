import {
    ADD_RESPONSE
  } from "./actionTypes";
  
  const initialState = {
    response: false,
  };
  
  export const keyStatsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_RESPONSE:
        return {
          ...state,
          response: action.payload,
        };
      default:
        return state;
    }
  }
  