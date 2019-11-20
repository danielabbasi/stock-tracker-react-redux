import { SET_CHART_TIME } from "./actionTypes";
import { CHART_DATA } from "../../../socket/eventTypes";
import { Middleware } from "redux";
import { AppState } from "store/rootReducer";
import { ADD_SYMBOL } from "../../search/redux/actionTypes";

type SearchState = Pick<AppState, "search" | "chart">;

export interface ChartSocketServiceDependency {
  socketService: {
    create: () => {
      emit: (type: string, store: string, actionPL: string) => void;
    };
  };
}

export const chartMiddleware = ({
  socketService
}: ChartSocketServiceDependency): Middleware<
  {},
  SearchState
> => store => next => action => {
  const socket = socketService.create();
  if (action.type === ADD_SYMBOL) {
    socket.emit(CHART_DATA, action.payload, store.getState().chart.chartTime);
  }
  if (action.type === SET_CHART_TIME) {
    socket.emit(CHART_DATA, store.getState().search.symbol, action.payload);
  }
  return next(action);
};
