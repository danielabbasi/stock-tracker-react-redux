import { SET_CHART_TIME } from "./actionTypes";
import { CHART_TIME } from "../../../socket/eventTypes";
import { Middleware } from "redux";
import { AppState } from "store/rootReducer";
import { SocketDependency } from "utils/socketService";

export const chartMiddleware = ({
  socketService
}: SocketDependency): Middleware<{}, AppState> => store => next => action => {
  if (action.type === SET_CHART_TIME) {
    socketService
      .create()
      .emit(CHART_TIME, store.getState().search.symbol, action.payload);
  }
  return next(action);
};
