import { ADD_COMPANY_OVERVIEW } from "./actionTypes"

export const addCompanyOverviewAction = companyOverview => ({
    type: ADD_COMPANY_OVERVIEW,
    payload: companyOverview
  });