import { SET_NEWS, SET_LOADING_NEWS, SET_ERROR_NEWS } from "./actionTypes";

export const setLatestNewsAction = latestNews => ({
  type: SET_NEWS,
  payload: latestNews
});

export const setLoadingNewsAction = () => ({ type: SET_LOADING_NEWS });

export const setErrorNewsAction = () => ({ type: SET_ERROR_NEWS });
