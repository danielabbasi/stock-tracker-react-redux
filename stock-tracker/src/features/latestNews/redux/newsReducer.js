import { SET_NEWS, SET_LOADING_NEWS, SET_ERROR_NEWS } from "./actionTypes";

const initialState = {
  latestNews: [],
  loading: false,
  error: false
};

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_NEWS:
      return {
        ...initialState,
        loading: true
      };
    case SET_NEWS:
      return {
        ...state,
        latestNews: action.payload,
        loading: false,
        error: false
      };
    case SET_ERROR_NEWS:
      return {
        ...state,
        error: true,
        loading: false
      };
    default:
      return state;
  }
};
