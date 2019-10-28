import {
  ADD_COMPANIES,
} from "./actionTypes";

const initialState = {
  companies: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMPANIES:
      return {
        ...state,
        companies: action.payload
      };
    default:
      return state;
  }
}
