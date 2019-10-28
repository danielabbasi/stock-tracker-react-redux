import { SET_RESPONSE, SET_LOADING_KEYSTATS } from "./actionTypes";

const initialState = {
  response: false,
  loading: false
};

export const keyStatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_KEYSTATS:
      return {
        ...initialState,
        loading: true
      };
    case SET_RESPONSE:
      return {
        ...state,
        response: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
