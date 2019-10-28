import { searchReducer } from "./searchReducer";
import { ADD_SYMBOL, ADD_SEARCH_INPUT, ADD_SUGGESTIONS } from "./actionTypes";

const setupInitialState = () => ({
  initialState: {
    symbol: "",
    searchInput: "",
    suggestions: false
  }
});

describe("testing Search Reducer", () => {
  describe("when given an unknown/invalid action", () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action = { type: "UNKOWN_ACTION" };
      newState = searchReducer(initialState, action);
    });
    it("should not change the initial state", () => {
      expect(newState).toBe(initialState);
    });
  });
  describe("when given an ADD_SYMBOL action", () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action = {
        type: ADD_SYMBOL,
        payload: "AAPL"
      };
      newState = searchReducer(initialState, action);
    });
    it("should update the symbol state", () => {
      expect(newState.symbol).toEqual("AAPL");
    });
  });
  describe("when given an ADD_SEARCH_INPUT action", () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action = {
        type: ADD_SEARCH_INPUT,
        payload: "AA"
      };
      newState = searchReducer(initialState, action);
    });
    it("should update the search input state", () => {
      expect(newState.searchInput).toEqual("AA");
    });
  });
  describe("when given an ADD_SUGGESTIONS action", () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action = {
        type: ADD_SUGGESTIONS,
        payload: [
          { name: "Apple, Inc.", symbol: "AAPL" },
          { name: "TESSCO Technologies, Inc.", symbol: "TESS" }
        ]
      };
      newState = searchReducer(initialState, action);
    });
    it("should update the suggestions state", () => {
      expect(newState.suggestions).toEqual([
        { name: "Apple, Inc.", symbol: "AAPL" },
        { name: "TESSCO Technologies, Inc.", symbol: "TESS" }
      ]);
    });
  });
});
