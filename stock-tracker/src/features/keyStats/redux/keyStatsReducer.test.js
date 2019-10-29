import { keyStatsReducer } from "./keyStatsReducer";
import {
  SET_RESPONSE,
  SET_LOADING_KEYSTATS,
  SET_ERROR_KEYSTATS
} from "./actionTypes";

const setupInitialState = () => ({
  initialState: {
    response: false,
    loading: false,
    error: false
  }
});

describe("testing keyStats Reducer", () => {
  describe("when given an unknown/invalid action", () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action = { type: "UNKNOWN_ACTION" };
      newState = keyStatsReducer(initialState, action);
    });
    it("should not change the initial state", () => {
      expect(newState).toBe(initialState);
    });
  });
  describe('when given the "ADD_RESPONSE" action', () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action = {
        type: SET_RESPONSE,
        payload: "Stock Data RESPONSE"
      };
      newState = keyStatsReducer(initialState, action);
    });
    it("should update the response state", () => {
      expect(newState.response).toEqual("Stock Data RESPONSE");
    });
  });
  describe("when given the SET_LOADING_KEYSTATS action", () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action = {
        type: SET_LOADING_KEYSTATS
      };
      newState = keyStatsReducer(initialState, action);
    });
    it("should update the loading state", () => {
      expect(newState.loading).toEqual(true);
    });
  });
  describe("when given the SET_ERROR_KEYSTATS action", () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action = {
        type: SET_ERROR_KEYSTATS
      };
      newState = keyStatsReducer(initialState, action);
    });
    it("should update the error state", () => {
      expect(newState.error).toEqual(true);
    });
  });
});
