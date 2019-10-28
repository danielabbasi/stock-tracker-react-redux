import { ADD_COMPANIES, INITIAL_STARTUP, RESET } from "./actionTypes";

export const addCompaniesAction = companies => ({
  type: ADD_COMPANIES,
  payload: companies
});

export const initialStartupAction = () => ({ type: INITIAL_STARTUP });

export const resetAction = () => ({ type: RESET });
