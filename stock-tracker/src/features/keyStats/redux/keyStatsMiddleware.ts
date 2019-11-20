import { ADD_SYMBOL } from "../../search";
import { STOCK_DATA } from "../../../socket/eventTypes";
import { Middleware } from "redux";
import { AppState } from "store/rootReducer";
import { SocketDependency } from "utils/socketService";

type KeyStatsState = Pick<AppState, "keyStats">;

export const keyStatsMiddleware = ({
  socketService
}: SocketDependency): Middleware<
  {},
  KeyStatsState
> => store => next => action => {
  if (action.type === ADD_SYMBOL) {
    const socket = socketService.create();
    socket.emit(STOCK_DATA, action.payload);
  }
  return next(action);
};
