import { SET_NEWS, SET_LOADING_NEWS, SET_ERROR_NEWS } from "./actionTypes";
import * as constants from "./actionTypes";
import { ActionWithPayload, Action } from "../../../utils/actions";

export type LatestNews = {
  headline: string;
  datetime: string;
  source: string;
  url: string;
};

export type SetLatestNews = ActionWithPayload<constants.SET_NEWS, LatestNews[]>;

export const setLatestNewsAction = (
  latestNews: LatestNews[]
): SetLatestNews => ({
  type: SET_NEWS,
  payload: latestNews
});

export type SetLoadingNews = Action<constants.SET_LOADING_NEWS>;

export const setLoadingNewsAction = (): SetLoadingNews => ({
  type: SET_LOADING_NEWS
});

export type SetErrorNews = Action<constants.SET_ERROR_NEWS>;

export const setErrorNewsAction = (): SetErrorNews => ({
  type: SET_ERROR_NEWS
});

export type NewsActions = SetErrorNews | SetLoadingNews | SetLatestNews;
