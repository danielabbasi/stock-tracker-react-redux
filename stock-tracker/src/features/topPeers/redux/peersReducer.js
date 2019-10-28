import { ADD_TOP_PEERS, SET_LOADING_PEERS } from "./actionTypes";

const initialState = {
  topPeers: [],
  loading: false
};

export const peersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_PEERS:
      return {
        ...initialState,
        loading: true
      };
    case ADD_TOP_PEERS:
      return {
        ...state,
        topPeers: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
