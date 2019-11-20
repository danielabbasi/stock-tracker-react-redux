import { ADD_SYMBOL } from "../../search";
import { COMPANY_OVERVIEW } from "../../../socket/eventTypes";
import { Middleware } from "redux";
import { AppState } from "store/rootReducer";
import { SocketDependency } from "utils/socketService";

type OverviewState = Pick<AppState, "overview">;

export const overviewMiddleware = ({
  socketService
}: SocketDependency): Middleware<
  {},
  OverviewState
> => store => next => action => {
  if (action.type === ADD_SYMBOL) {
    const socket = socketService.create();
    socket.emit(COMPANY_OVERVIEW, action.payload);
  }
  return next(action);
};
