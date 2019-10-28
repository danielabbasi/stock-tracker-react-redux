import {
  ADD_COMPANIES,
  INITIAL_STARTUP,
} from "./actionTypes"


export const addCompaniesAction = companies => ({
  type: ADD_COMPANIES,
  payload: companies
});

export const initialStartupAction = () => ({ type: INITIAL_STARTUP });

