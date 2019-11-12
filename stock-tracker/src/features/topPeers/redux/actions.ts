import {
  ADD_TOP_PEERS,
  SET_LOADING_PEERS,
  SET_ERROR_PEERS
} from "./actionTypes";
import { ActionWithPayload, Action } from "utils/actions";

export type TopPeers = string[];

export type SetTopPeers = ActionWithPayload<typeof ADD_TOP_PEERS, TopPeers>;

export const addTopPeersAction = (topPeers: TopPeers): SetTopPeers => ({
  type: ADD_TOP_PEERS,
  payload: topPeers
});

export type SetLoadingPeers = Action<typeof SET_LOADING_PEERS>;

export const setLoadingPeersAction = (): SetLoadingPeers => ({
  type: SET_LOADING_PEERS
});

export type SetErrorPeers = Action<typeof SET_ERROR_PEERS>;

export const setErrorPeersAction = (): SetErrorPeers => ({
  type: SET_ERROR_PEERS
});

export type TopPeersActions = SetTopPeers | SetErrorPeers | SetLoadingPeers;
