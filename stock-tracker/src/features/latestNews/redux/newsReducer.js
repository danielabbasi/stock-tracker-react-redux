import { ADD_NEWS } from "./actionTypes";

const initialState = {
    latestNews: []
}

export const newsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_NEWS:
        return {
          ...state,
          latestNews: action.payload
        };
      default:
        return state;
    }
  }
  