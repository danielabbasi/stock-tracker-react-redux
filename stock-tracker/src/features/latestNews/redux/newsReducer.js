import { SET_NEWS, SET_LOADING_NEWS } from "./actionTypes";

const initialState = {
  latestNews: [],
  loading: false
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
        loading: false
      };
    default:
      return state;
  }
};
