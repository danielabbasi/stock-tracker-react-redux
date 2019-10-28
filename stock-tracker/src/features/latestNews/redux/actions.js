import { ADD_NEWS } from "./actionTypes"

export const addLatestNewsAction = latestNews => ({
    type: ADD_NEWS,
    payload: latestNews
  });