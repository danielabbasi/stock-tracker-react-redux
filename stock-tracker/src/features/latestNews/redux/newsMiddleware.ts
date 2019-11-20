import { ADD_SYMBOL } from "../../search";
import { LATEST_NEWS } from "../../../socket/eventTypes";
import { Middleware } from "redux";
import { AppState } from "store/rootReducer";
import { SocketDependency } from "utils/socketService";

type NewsState = Pick<AppState, "news">;

export const newsMiddleware = ({
  socketService
}: SocketDependency): Middleware<{}, NewsState> => store => next => action => {
  if (action.type === ADD_SYMBOL) {
    const socket = socketService.create();
    socket.emit(LATEST_NEWS, action.payload);
  }
  return next(action);
};
