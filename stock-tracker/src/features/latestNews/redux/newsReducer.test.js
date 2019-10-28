import { newsReducer } from "./newsReducer";
import { SET_NEWS, SET_LOADING_NEWS, SET_ERROR_NEWS } from "./actionTypes";

const setupInitialState = () => ({
  initialState: {
    latestNews: [],
    loading: false,
    error: false
  }
});

describe("testing News Reducer", () => {
  describe("when given an unknown/invalid action", () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action = { type: "UNKNOWN_ACTION" };
      newState = newsReducer(initialState, action);
    });
    it("should not change the initial state", () => {
      expect(newState).toBe(initialState);
    });
  });
  describe('when given the "SET_NEWS" action', () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action = {
        type: SET_NEWS,
        payload: ["NEWS 1", "NEWS 2", "NEWS 3"]
      };
      newState = newsReducer(initialState, action);
    });
    it("should update the latestNews state", () => {
      expect(newState.latestNews).toEqual(["NEWS 1", "NEWS 2", "NEWS 3"]);
    });
  });
  describe("when given the SET_LOADING_NEWS action", () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action = {
        type: SET_LOADING_NEWS
      };
      newState = newsReducer(initialState, action);
    });
    it("should update the loading state", () => {
      expect(newState.loading).toEqual(true);
    });
  });
  describe("when given the SET_ERROR_NEWS action", () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action = {
        type: SET_ERROR_NEWS
      };
      newState = newsReducer(initialState, action);
    });
    it("should update the error state", () => {
      expect(newState.error).toEqual(true);
    });
  });
});
