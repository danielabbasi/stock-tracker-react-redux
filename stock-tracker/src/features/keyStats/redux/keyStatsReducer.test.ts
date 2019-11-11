import { keyStatsReducer, KeyStatsState } from "./keyStatsReducer";
import {
  SET_RESPONSE,
  SET_LOADING_KEYSTATS,
  SET_ERROR_KEYSTATS
} from "./actionTypes";
import { SetResponse, SetLoadingKeyStats, SetErrorKeyStats } from "./actions";

const setupInitialState = (): KeyStatsState => ({
  response: undefined,
  loading: false,
  error: false
});

describe("testing keyStats Reducer", () => {
  describe('when given the "ADD_RESPONSE" action', () => {
    let initialState: KeyStatsState;
    let newState: KeyStatsState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetResponse = {
        type: SET_RESPONSE,
        payload: {
          latestPrice: 122,
          change: 3,
          changePercent: 2,
          symbol: "AAPL",
          companyName: "Apple",
          previousClose: 300,
          high: 150,
          low: 100,
          previousVolume: 125000,
          marketCap: 300000,
          peRatio: 1.2,
          open: 100,
          week52High: 170,
          week52Low: 80,
          avgTotalVolume: 150000,
          earningsPerShare: 1.5,
          ytdChange: 0.8,
          currency: "USD",
          latestTime: "2019/09,01 15:03",
          latestUpdate: 12500929384,
          isUSMarketOpen: true
        }
      };
      newState = keyStatsReducer(initialState, action);
    });
    it("should update the response state", () => {
      expect(newState.response).toEqual({
        latestPrice: 122,
        change: 3,
        changePercent: 2,
        symbol: "AAPL",
        companyName: "Apple",
        previousClose: 300,
        high: 150,
        low: 100,
        previousVolume: 125000,
        marketCap: 300000,
        peRatio: 1.2,
        open: 100,
        week52High: 170,
        week52Low: 80,
        avgTotalVolume: 150000,
        earningsPerShare: 1.5,
        ytdChange: 0.8,
        currency: "USD",
        latestTime: "2019/09,01 15:03",
        latestUpdate: 12500929384,
        isUSMarketOpen: true
      });
    });
  });
  describe("when given the SET_LOADING_KEYSTATS action", () => {
    let initialState: KeyStatsState;
    let newState: KeyStatsState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetLoadingKeyStats = {
        type: SET_LOADING_KEYSTATS
      };
      newState = keyStatsReducer(initialState, action);
    });
    it("should update the loading state", () => {
      expect(newState.loading).toEqual(true);
    });
  });
  describe("when given the SET_ERROR_KEYSTATS action", () => {
    let initialState: KeyStatsState;
    let newState: KeyStatsState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetErrorKeyStats = {
        type: SET_ERROR_KEYSTATS
      };
      newState = keyStatsReducer(initialState, action);
    });
    it("should update the error state", () => {
      expect(newState.error).toEqual(true);
    });
  });
});
