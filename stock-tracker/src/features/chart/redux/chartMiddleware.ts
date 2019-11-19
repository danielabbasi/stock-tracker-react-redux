import { SET_CHART_TIME } from "./actionTypes";
import { CHART_TIME } from "../../../socket/eventTypes";
import { Middleware } from "redux";
import { AppState } from "store/rootReducer";

type SearchState = Pick<AppState, "search">;

export interface SocketServiceDependency {
  socketService: {
    create: () => {
      emit: (type: string, store: string, actionPL: string) => void;
    };
  };
}

export const chartMiddleware = ({
  socketService
}: SocketServiceDependency): Middleware<
  {},
  SearchState
> => store => next => action => {
  if (action.type === SET_CHART_TIME) {
    socketService
      .create()
      .emit(CHART_TIME, store.getState().search.symbol, action.payload);
  }
  return next(action);
};
