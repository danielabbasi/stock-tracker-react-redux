import { ADD_TOP_PEERS } from "./actionTypes";
  
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
      default:
        return state;
    }
  }
  