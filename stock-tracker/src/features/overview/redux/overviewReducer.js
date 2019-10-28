import { ADD_COMPANY_OVERVIEW } from "./actionTypes";
  
  const initialState = {
    companyOverview: false
  };
  
  export const overviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_COMPANY_OVERVIEW:
        return {
          ...state,
          companyOverview: action.payload,
          loading: state.loading - 1
        };
      default:
        return state;
    }
  }
  