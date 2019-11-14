import { SET_NEWS, SET_LOADING_NEWS, SET_ERROR_NEWS } from "./actionTypes";
import { Reducer } from "redux";
import { LatestNews, NewsActions } from "./actions";

export type LatestNewsState = {
  latestNews: LatestNews[];
  loading: boolean;
  error: boolean;
};

const initialState: LatestNewsState = {
  latestNews: [],
  loading: false,
  error: false
};

export const newsReducer: Reducer<Readonly<LatestNewsState>, NewsActions> = (
  state = initialState,
  action
) => {
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
