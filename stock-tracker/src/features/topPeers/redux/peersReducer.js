import { ADD_TOP_PEERS } from "./actionTypes";
import { RESET } from "../../../store/actionTypes";

const initialState = {
  topPeers: []
};

export const peersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOP_PEERS:
      return {
        ...state,
        topPeers: action.payload
      };
    case RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
