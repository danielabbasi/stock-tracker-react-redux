import { ADD_COMPANY_OVERVIEW } from "./actionTypes";
import { RESET } from "../../../store/actionTypes";

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
    case RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
