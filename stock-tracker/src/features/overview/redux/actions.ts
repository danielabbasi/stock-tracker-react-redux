import {
  ADD_COMPANY_OVERVIEW,
  SET_LOADING_OVERVIEW,
  SET_ERROR_OVERVIEW
} from "./actionTypes";
import { ActionWithPayload, Action } from "utils/actions";

export interface CompanyOverviewData {
  companyName: string;
  symbol: string;
  exchange: string;
  industry: string;
  website: string;
  description: string;
}

export type SetCompanyOverview = ActionWithPayload<
  typeof ADD_COMPANY_OVERVIEW,
  CompanyOverviewData
>;

export const setCompanyOverviewAction = (
  companyOverview: CompanyOverviewData
): SetCompanyOverview => ({
  type: ADD_COMPANY_OVERVIEW,
  payload: companyOverview
});

export type SetLoadingCompanyOverview = Action<typeof SET_LOADING_OVERVIEW>;

export const setLoadingOverviewAction = (): SetLoadingCompanyOverview => ({
  type: SET_LOADING_OVERVIEW
});

export type SetErrorCompanyOverview = Action<typeof SET_ERROR_OVERVIEW>;

export const setErrorOverviewAction = (): SetErrorCompanyOverview => ({
  type: SET_ERROR_OVERVIEW
});

export type CompanyOverviewActions =
  | SetCompanyOverview
  | SetErrorCompanyOverview
  | SetLoadingCompanyOverview;
