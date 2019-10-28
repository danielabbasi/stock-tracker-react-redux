import { ADD_TOP_PEERS, SET_LOADING_PEERS } from "./actionTypes";

export const addTopPeersAction = topPeers => ({
  type: ADD_TOP_PEERS,
  payload: topPeers
});

export const setLoadingPeersAction = () => ({ type: SET_LOADING_PEERS });
