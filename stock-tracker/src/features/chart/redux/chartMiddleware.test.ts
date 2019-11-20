import { Dispatch, Store } from "redux";
import { AppState } from "store/rootReducer";
import { SET_CHART_TIME } from "./actionTypes";
import {
  chartMiddleware,
  ChartSocketServiceDependency
} from "./chartMiddleware";
import { ADD_SYMBOL } from "features/search";

describe("Testing the Chart Middleware", () => {
  let mockSocket: ChartSocketServiceDependency;
  let store: Pick<
    Store<Pick<AppState, "search" | "chart">>,
    "getState" | "dispatch"
  >;
  let next: Dispatch;
  let emit: jest.Mock;
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
        search: { symbol: "AAPL", error: false, searchInput: "" },
        chart: {
          chartTime: "1Y",
          chartData: [{ close: 12, date: "2019/01/01" }],
          loading: false,
          error: false
        }
      }),
      dispatch
    };

    next = jest.fn();
  });

  describe("when being called with the SET_CHART_TIME action", () => {
    beforeAll(() => {
      action = {
        type: SET_CHART_TIME,
        payload: "1Y"
      };
    });
    it("should call emit", () => {
      chartMiddleware(mockSocket)(store)(next)(action);
      expect(emit).toHaveBeenCalledTimes(1);
    });

    it("with correct symbol and payload", () => {
      chartMiddleware(mockSocket)(store)(next)(action);
      expect(emit).toHaveBeenCalledWith("ChartData", "AAPL", "1Y");
    });
    it("should call next function with action", () => {
      chartMiddleware(mockSocket)(store)(next)(action);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(action);
    });
    it("should not call dispatch function", () => {
      chartMiddleware(mockSocket)(store)(next)(action);
      expect(dispatch).toHaveBeenCalledTimes(0);
    });
  });
  describe("when being called with the ADD_SYMBOL action", () => {
    beforeAll(() => {
      action = {
        type: ADD_SYMBOL,
        payload: "ECOR"
      };
    });
    it("should call emit ", () => {
      chartMiddleware(mockSocket)(store)(next)(action);
      expect(emit).toHaveBeenCalledTimes(1);
    });
    it("with the correct payload and chartTime ", () => {
      chartMiddleware(mockSocket)(store)(next)(action);
      expect(emit).toHaveBeenCalledWith("ChartData", "ECOR", "1Y");
    });
    it("should call next function with action", () => {
      chartMiddleware(mockSocket)(store)(next)(action);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(action);
    });
    it("should not call dispatch function", () => {
      chartMiddleware(mockSocket)(store)(next)(action);
      expect(dispatch).toHaveBeenCalledTimes(0);
    });
  });
});
