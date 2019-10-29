import { overviewReducer } from "./overviewReducer";
import {
  ADD_COMPANY_OVERVIEW,
  SET_LOADING_OVERVIEW,
  SET_ERROR_OVERVIEW
} from "./actionTypes";

const setupInitialState = () => ({
  initialState: {
    companyOverview: false,
    loading: false,
    error: false
  }
});

describe("testing Company Overview Reducer", () => {
  describe("when given an unknown/invalid action", () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action = { type: "UNKNOWN_ACTION" };
      newState = overviewReducer(initialState, action);
    });
    it("should not change the initial state", () => {
      expect(newState).toBe(initialState);
    });
  });
  describe('when given the "ADD_COMPANY_OVERVIEW" action', () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action = {
        type: ADD_COMPANY_OVERVIEW,
        payload: "Company Overview Data"
      };
      newState = overviewReducer(initialState, action);
    });
    it("should update the overview state", () => {
      expect(newState.companyOverview).toEqual("Company Overview Data");
    });
  });
  describe("when given the SET_LOADING_OVERVIEW action", () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action = {
        type: SET_LOADING_OVERVIEW
      };
      newState = overviewReducer(initialState, action);
    });
    it("should update the loading state", () => {
      expect(newState.loading).toEqual(true);
    });
  });
  describe("when given the SET_ERROR_OVERVIEW action", () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action = {
        type: SET_ERROR_OVERVIEW
      };
      newState = overviewReducer(initialState, action);
    });
    it("should update the error state", () => {
      expect(newState.error).toEqual(true);
    });
  });
});
