import { SET_CHART_TIME } from "./actionTypes";
import { CHART_TIME } from "../../../socket/eventTypes";
import { Middleware, Store } from "redux";
import { AppState } from "store/rootReducer";

export interface SocketS {
  socketService: {
    create: () => {
      emit: (type: string, store: string, actionPL: string) => any;
    };
  };
}

export const chartMiddleware = ({
  socketService
}: SocketS): Middleware<
  {},
  Pick<AppState, "search">
> => store => next => action => {
  if (action.type === SET_CHART_TIME) {
    socketService
      .create()
      .emit(CHART_TIME, store.getState().search.symbol, action.payload);
  }
  return next(action);
};
