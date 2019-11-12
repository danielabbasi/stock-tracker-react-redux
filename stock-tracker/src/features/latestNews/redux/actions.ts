import { SET_NEWS, SET_LOADING_NEWS, SET_ERROR_NEWS } from "./actionTypes";
import { ActionWithPayload, Action } from "utils/actions";

export interface LatestNews {
  headline: string;
  datetime: string;
  source: string;
  url: string;
}

export type SetLatestNews = ActionWithPayload<typeof SET_NEWS, LatestNews[]>;

export const setLatestNewsAction = (
  latestNews: LatestNews[]
): SetLatestNews => ({
  type: SET_NEWS,
  payload: latestNews
});

export type SetLoadingNews = Action<typeof SET_LOADING_NEWS>;

export const setLoadingNewsAction = (): SetLoadingNews => ({
  type: SET_LOADING_NEWS
});

export type SetErrorNews = Action<typeof SET_ERROR_NEWS>;

export const setErrorNewsAction = (): SetErrorNews => ({
  type: SET_ERROR_NEWS
});

export type NewsActions = SetErrorNews | SetLoadingNews | SetLatestNews;
