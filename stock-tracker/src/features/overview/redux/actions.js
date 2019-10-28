import { ADD_COMPANY_OVERVIEW, SET_LOADING_OVERVIEW } from "./actionTypes";

export const setCompanyOverviewAction = companyOverview => ({
  type: ADD_COMPANY_OVERVIEW,
  payload: companyOverview
});

export const setLoadingOverviewAction = () => ({ type: SET_LOADING_OVERVIEW });
