import { ADD_COMPANY_OVERVIEW, SET_LOADING_OVERVIEW } from "./actionTypes";

const initialState = {
  companyOverview: false,
  loading: false
};

export const overviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_OVERVIEW:
      return {
        ...initialState,
        loading: true
      };
    case ADD_COMPANY_OVERVIEW:
      return {
        ...state,
        companyOverview: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
