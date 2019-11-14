import { overviewReducer, CompanyOverviewState } from "./overviewReducer";
import {
  ADD_COMPANY_OVERVIEW,
  SET_LOADING_OVERVIEW,
  SET_ERROR_OVERVIEW
} from "./actionTypes";
import {
  SetCompanyOverview,
  SetLoadingCompanyOverview,
  SetErrorCompanyOverview
} from "./actions";

const setupInitialState = (): CompanyOverviewState => ({
  companyOverview: undefined,
  loading: false,
  error: false
});

describe("testing Company Overview Reducer", () => {
  describe('when given the "ADD_COMPANY_OVERVIEW" action', () => {
    let initialState: CompanyOverviewState;
    let newState: CompanyOverviewState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetCompanyOverview = {
        type: ADD_COMPANY_OVERVIEW,
        payload: {
          companyName: "Apple",
          symbol: "AAPL",
          exchange: "NASDAQ",
          industry: "Technology",
          website: "www.apple.com",
          description: "a shit company"
        }
      };
      newState = overviewReducer(initialState, action);
    });
    it("should update the overview state", () => {
      expect(newState.companyOverview).toEqual({
        companyName: "Apple",
        symbol: "AAPL",
        exchange: "NASDAQ",
        industry: "Technology",
        website: "www.apple.com",
        description: "a shit company"
      });
    });
  });
  describe("when given the SET_LOADING_OVERVIEW action", () => {
    let initialState: CompanyOverviewState;
    let newState: CompanyOverviewState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetLoadingCompanyOverview = {
        type: SET_LOADING_OVERVIEW
      };
      newState = overviewReducer(initialState, action);
    });
    it("should update the loading state", () => {
      expect(newState.loading).toEqual(true);
    });
  });
  describe("when given the SET_ERROR_OVERVIEW action", () => {
    let initialState: CompanyOverviewState;
    let newState: CompanyOverviewState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetErrorCompanyOverview = {
        type: SET_ERROR_OVERVIEW
      };
      newState = overviewReducer(initialState, action);
    });
    it("should update the error state", () => {
      expect(newState.error).toEqual(true);
    });
  });
});
