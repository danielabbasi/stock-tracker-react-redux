import { Dispatch, Store } from "redux";
import { AppState } from "store/rootReducer";
import { SET_CHART_TIME } from "./actionTypes";
import {
  chartMiddleware,
  ChartSocketServiceDependency
} from "./chartMiddleware";

describe("Testing the Chart Middleware", () => {
  let mockSocket: ChartSocketServiceDependency;
  let store: Pick<Store<Pick<AppState, "search">>, "getState" | "dispatch">;
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
        search: { symbol: "AAPL", error: false, searchInput: "" }
      }),
      dispatch
    };

    next = jest.fn();
  });

  describe("when being called with the SET_CHART_TIME action", () => {
    it("should call emit and next functions and not dispatch", () => {
      action = {
        type: SET_CHART_TIME,
        payload: "1Y"
      };
      chartMiddleware(mockSocket)(store)(next)(action);
      expect(emit).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(action);
      expect(dispatch).toHaveBeenCalledTimes(0);
    });

    it("with correct symbol and payload", () => {
      const chartTime = "chartTime";
      chartMiddleware(mockSocket)(store)(next)(action);

      expect(emit).toHaveBeenCalledWith(
        chartTime,
        store.getState().search.symbol,
        action.payload
      );
    });
  });
});
