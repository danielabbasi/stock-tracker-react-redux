import reducer from "./store/reducer";
import {
  ADD_RESPONSE,
  ADD_SYMBOL,
  ADD_COMPANIES,
  ADD_COMPANY_OVERVIEW,
  ADD_CHARTDATA,
  ADD_NEWS,
  ADD_CHARTTIME,
  ADD_TOP_PEERS,
  ADD_SEARCH_INPUT,
  ADD_SUGGESTIONS,
  REQUEST_ERROR
} from "./store/actionTypes";

const setupIntialState = () => ({
  initialState: {
    response: false,
    symbol: "",
    companies: false,
    latestNews: [],
    chartData: [],
    chartTime: "1Y",
    companyOverview: false,
    topPeers: [],
    loading: 0,
    searchInput: "",
    suggestions: false,
    error: {
      stockData: false,
      companies: false,
      companyOverview: false,
      latestNews: false,
      chartData: false,
      topPeers: false
    }
  }
});

describe("testing state reducer", () => {
  describe("when given unknown/invalid action", () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupIntialState();
      const action = { type: "UNKNOWN_ACTION" };
      newState = reducer(initialState, action);
    });
    it("should not change the initial state", () => {
      expect(newState).toBe(initialState);
    });
  });
  describe('when given "ADD_SYMBOL" action', () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupIntialState();
      const action = {
        type: ADD_SYMBOL,
        payload: "AAPL"
      };
      newState = reducer(initialState, action);
    });
    it("should update the symbol state", () => {
      expect(newState.symbol).toEqual("AAPL");
    });
  });
  describe('when given "ADD_RESPONSE" action', () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupIntialState();
      const action = {
        type: ADD_NEWS,
        payload: ["NEWS 1", "NEWS 2", "NEWS 3"]
      };
      newState = reducer(initialState, action);
    });
    it("should update the news state", () => {
      expect(newState.latestNews).toEqual(["NEWS 1", "NEWS 2", "NEWS 3"]);
    });
  });
});
