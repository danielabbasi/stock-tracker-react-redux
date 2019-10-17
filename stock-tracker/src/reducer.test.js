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
import { newExpression } from "@babel/types";

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
  describe('when given "ADD_NEWS" action', () => {
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
  describe('when given "ADD_COMPANIES" action', () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupIntialState();
      const action = {
        type: ADD_COMPANIES,
        payload: ["AAPL", "A", "ECOR"]
      };
      newState = reducer(initialState, action);
    });
    it("should update the companies state", () => {
      expect(newState.companies).toEqual(["AAPL", "A", "ECOR"]);
    });
  });
  describe('when given "ADD_COMPANY_OVERVIEW" action', () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupIntialState();
      const action = {
        type: ADD_COMPANY_OVERVIEW,
        payload: "Company Overview Data"
      };
      newState = reducer(initialState, action);
    });
    it("should update the companies state", () => {
      expect(newState.companyOverview).toEqual("Company Overview Data");
    });
  });
  describe('when given the "ADD_RESPONSE" action', () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupIntialState();
      const action = {
        type: ADD_RESPONSE,
        payload: "Stock Data RESPONSE"
      };
      newState = reducer(initialState, action);
    });
    it("should update the response state", () => {
      expect(newState.response).toEqual("Stock Data RESPONSE");
    });
  });
  describe('when given the "ADD_CHARTDATA" action', () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupIntialState();
      const action = {
        type: ADD_CHARTDATA,
        payload: [
          { close: "187.1", date: "2018/04/14" },
          { close: "69", date: "2018/12/02" }
        ]
      };
      newState = reducer(initialState, action);
    });
    it("should update the chart data state", () => {
      expect(newState.chartData).toEqual([
        { close: "187.1", date: "2018/04/14" },
        { close: "69", date: "2018/12/02" }
      ]);
    });
  });
  describe('when given the "ADD_CHARTTIME" action', () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupIntialState();
      const action = {
        type: ADD_CHARTTIME,
        payload: "5Y"
      };
      newState = reducer(initialState, action);
    });
    it("should update the chart time state", () => {
      expect(newState.chartTime).toEqual("5Y");
    });
  });
  describe('when given the "ADD_TOP_PEERS" action', () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupIntialState();
      const action = {
        type: ADD_TOP_PEERS,
        payload: ["GOOG", "ECOR", "TESS"]
      };
      newState = reducer(initialState, action);
    });
    it("should update the top peers state", () => {
      expect(newState.topPeers).toEqual(["GOOG", "ECOR", "TESS"]);
    });
  });
  describe('when given the "ADD_SEARCH_INPUT" action', () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupIntialState();
      const action = {
        type: ADD_SEARCH_INPUT,
        payload: "AA"
      };
      newState = reducer(initialState, action);
    });
    it("should update the search input state", () => {
      expect(newState.searchInput).toEqual("AA");
    });
  });
  describe('when given the "ADD_SUGGESTIONS" action', () => {
    let initialState;
    let newState;
    beforeAll(() => {
      initialState = setupIntialState();
      const action = {
        type: ADD_SUGGESTIONS,
        payload: [
          { name: "Apple, Inc.", symbol: "AAPL" },
          { name: "TESSCO Technologies, Inc.", symbol: "TESS" }
        ]
      };
      newState = reducer(initialState, action);
    });
    it("should update the suggestions state", () => {
      expect(newState.suggestions).toEqual([
        { name: "Apple, Inc.", symbol: "AAPL" },
        { name: "TESSCO Technologies, Inc.", symbol: "TESS" }
      ]);
    });
  });
  describe('when given the "REQUEST_ERROR" action', () => {
    let initialState;
    beforeEach(() => {
      initialState = setupIntialState();
    });
    describe("for the stock data", () => {
      let newState;
      let action;
      beforeAll(() => {
        action = {
          type: REQUEST_ERROR,
          payload: { requestName: "stockData", message: "stock error" }
        };
      });
      it("should update the stock error state to be true", () => {
        newState = reducer(initialState, action);
        expect(newState.error.stockData).toEqual(true);
      });
    });
    describe("for the companies data", () => {
      let newState;
      let action;
      beforeAll(() => {
        action = {
          type: REQUEST_ERROR,
          payload: { requestName: "companies", message: "companies error" }
        };
      });
      it("should update the companies error state to true", () => {
        newState = reducer(initialState, action);
        expect(newState.error.companies).toEqual(true);
      });
    });
    describe("for the companyOverview data", () => {
      let newState;
      let action;
      beforeAll(() => {
        action = {
          type: REQUEST_ERROR,
          payload: {
            requestName: "companyOverview",
            message: "companyOverview error"
          }
        };
      });
      it("should update the companyOverview error state to true", () => {
        newState = reducer(initialState, action);
        expect(newState.error.companyOverview).toEqual(true);
      });
    });
    describe("for the latestNews data", () => {
      let newState;
      let action;
      beforeAll(() => {
        action = {
          type: REQUEST_ERROR,
          payload: { requestName: "latestNews", message: "latestNews error" }
        };
      });
      it("should update the latestNews error state to true", () => {
        newState = reducer(initialState, action);
        expect(newState.error.latestNews).toEqual(true);
      });
    });
    describe("for the chartData data", () => {
      let newState;
      let action;
      beforeAll(() => {
        action = {
          type: REQUEST_ERROR,
          payload: { requestName: "chartData", message: "chartData error" }
        };
      });
      it("should update the chartData error state to true", () => {
        newState = reducer(initialState, action);
        expect(newState.error.chartData).toEqual(true);
      });
    });
    describe("for the topPeers data", () => {
      let newState;
      let action;
      beforeAll(() => {
        action = {
          type: REQUEST_ERROR,
          payload: { requestName: "topPeers", message: "topPeers error" }
        };
      });
      it("should update the topPeers error state to true", () => {
        newState = reducer(initialState, action);
        expect(newState.error.topPeers).toEqual(true);
      });
    });
  });
});
