import { searchReducer, SearchState } from "./searchReducer";
import {
  ADD_SYMBOL,
  ADD_SEARCH_INPUT,
  ADD_SUGGESTIONS,
  SET_ERROR_SEARCH
} from "./actionTypes";
import {
  SetSymbol,
  SetSearchInput,
  SetSuggestions,
  SetSearchError
} from "./actions";

const setupInitialState = (): SearchState => ({
  symbol: "",
  searchInput: "",
  suggestions: undefined,
  error: false
});

describe("testing Search Reducer", () => {
  // describe("when given an unknown/invalid action", () => {
  //   let initialState: SearchState;
  //   let newState: SearchState;
  //   beforeAll(() => {
  //     initialState = setupInitialState();
  //     const action = { type: "UNKOWN_ACTION" };
  //     newState = searchReducer(initialState, action);
  //   });
  //   it("should not change the initial state", () => {
  //     expect(newState).toBe(initialState);
  //   });
  // });
  describe("when given an ADD_SYMBOL action", () => {
    let initialState: SearchState;
    let newState: SearchState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetSymbol = {
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
    let initialState: SearchState;
    let newState: SearchState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetSearchInput = {
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
    let initialState: SearchState;
    let newState: SearchState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetSuggestions = {
        type: ADD_SUGGESTIONS,
        payload: [
          {
            symbol: "AAPL",
            name: "Apple",
            exchange: "NASDAQ"
          }
        ]
      };
      newState = searchReducer(initialState, action);
    });
    it("should update the suggestions state", () => {
      expect(newState.suggestions).toEqual([
        {
          symbol: "AAPL",
          name: "Apple",
          exchange: "NASDAQ"
        }
      ]);
    });
  });
  describe("when given an SET_ERROR_SEARCH action", () => {
    let initialState: SearchState;
    let newState: SearchState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetSearchError = {
        type: SET_ERROR_SEARCH
      };
      newState = searchReducer(initialState, action);
    });
    it("should update the error search state", () => {
      expect(newState.error).toEqual(true);
    });
  });
});
