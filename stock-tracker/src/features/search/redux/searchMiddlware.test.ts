import {
  SearchSocketServiceDependency,
  searchMiddleware
} from "./searchMiddleware";
import { Store, Dispatch } from "redux";
import { AppState } from "store/rootReducer";
import { ADD_SYMBOL, ADD_SEARCH_INPUT } from "./actionTypes";
import { setChartLoadingAction } from "features/chart";
import { setLoadingNewsAction } from "features/latestNews";
import { setLoadingKeyStatsAction } from "features/keyStats";
import { setLoadingOverviewAction } from "features/overview";
import { setLoadingPeersAction } from "features/topPeers";

describe("Testing Search Middleware", () => {
  let mockSocket: SearchSocketServiceDependency;
  let emit: jest.Mock;
  let store: Pick<Store<Pick<AppState, "chart">>, "getState" | "dispatch">;
  let next: Dispatch;
  let action: { type: string; payload: string };
  let dispatch: jest.Mock;

  beforeEach(() => {
    emit = jest.fn();
    dispatch = jest.fn();

    mockSocket = {
      socketService: {
        create: () => ({
          emit
        })
      }
    };

    store = {
      getState: () => ({
        chart: { chartTime: "1Y", chartData: [], loading: false, error: false }
      }),
      dispatch
    };
    next = jest.fn();
  });

  describe("when called with a ADD_SYMBOL action", () => {
    it("should call the next function with action", () => {
      action = {
        type: ADD_SYMBOL,
        payload: "AAPL"
      };
      searchMiddleware(mockSocket)(store)(next)(action);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(action);
    });
    it("should call dispatch 5 times", () => {
      searchMiddleware(mockSocket)(store)(next)(action);
      expect(dispatch).toHaveBeenCalledTimes(5);
    });
    it("should not call the emit function", () => {
      searchMiddleware(mockSocket)(store)(next)(action);
      expect(emit).toHaveBeenCalledTimes(0);
    });
    it("should call dispatch with the correct actions", () => {
      searchMiddleware(mockSocket)(store)(next)(action);
      expect(dispatch).toHaveBeenCalledWith(setChartLoadingAction());
      expect(dispatch).toHaveBeenCalledWith(setLoadingNewsAction());
      expect(dispatch).toHaveBeenCalledWith(setLoadingKeyStatsAction());
      expect(dispatch).toHaveBeenCalledWith(setLoadingOverviewAction());
      expect(dispatch).toHaveBeenCalledWith(setLoadingPeersAction());
    });
  });

  describe("when called with a ADD_SEARCH_INPUT action", () => {
    it("should call the emit function", () => {
      action = {
        type: ADD_SEARCH_INPUT,
        payload: "A"
      };
      searchMiddleware(mockSocket)(store)(next)(action);
      expect(emit).toHaveBeenCalledTimes(1);
    });
    it("with the correct data", () => {
      const SEARCH_INPUT = "search";
      searchMiddleware(mockSocket)(store)(next)(action);
      expect(emit).toHaveBeenCalledWith(SEARCH_INPUT, "A");
    });
    it("should call the next function with action", () => {
      searchMiddleware(mockSocket)(store)(next)(action);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(action);
    });
  });
});
