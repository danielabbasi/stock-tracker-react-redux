import { ADD_SYMBOL } from "../../search";
import { TOP_PEERS } from "../../../socket/eventTypes";
import { Middleware } from "redux";
import { AppState } from "store/rootReducer";
import { SocketDependency } from "utils/socketService";

type PeersState = Pick<AppState, "peers">;

export const peersMiddleware = ({
  socketService
}: SocketDependency): Middleware<{}, PeersState> => store => next => action => {
  if (action.type === ADD_SYMBOL) {
    const socket = socketService.create();
    socket.emit(TOP_PEERS, action.payload);
  }
  return next(action);
};
