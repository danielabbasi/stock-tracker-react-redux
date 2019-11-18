import { Dispatch, Store } from "redux";
import { AppState } from "store/rootReducer";
import { SET_CHART_TIME } from "./actionTypes";
import { chartMiddleware, SocketS } from "./chartMiddleware";
import { CHART_TIME } from "socket/eventTypes";

describe("Testing the Chart Middleware", () => {
  let mockSocket: SocketS;
  let store: Store<Pick<AppState, "search">>;
  let next: Dispatch;
  let emit: jest.Mock;
  let action;

  beforeEach(() => {
    emit = jest.fn();

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
      })
    } as Store<Pick<AppState, "search">>;

    next = jest.fn();
  });

  test("Should call emit and next functions", () => {
    chartMiddleware(mockSocket)(store)(next)({
      type: SET_CHART_TIME
    });
    expect(emit).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test("with correct symbol and payload", () => {
    action = {
      type: SET_CHART_TIME,
      payload: "1Y"
    };
    chartMiddleware(mockSocket)(store)(next)(action);

    expect(emit).toHaveBeenCalledWith(action);
    // expect(emit).toStrictEqual("1Y")
  });
});
