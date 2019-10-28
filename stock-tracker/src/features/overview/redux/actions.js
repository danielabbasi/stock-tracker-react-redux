import {
  ADD_COMPANY_OVERVIEW,
  SET_LOADING_OVERVIEW,
  SET_ERROR_OVERVIEW
} from "./actionTypes";

export const setCompanyOverviewAction = companyOverview => ({
  type: ADD_COMPANY_OVERVIEW,
  payload: companyOverview
});

export const setLoadingOverviewAction = () => ({ type: SET_LOADING_OVERVIEW });

export const setErrorOverviewAction = () => ({ type: SET_ERROR_OVERVIEW });
