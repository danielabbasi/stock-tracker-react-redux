import { INITIAL_STARTUP } from "./actionTypes";
import { createSocketSubscriptions } from "../socket/subscriptions";
import { SocketDependency } from "utils/socketService";
import { Middleware } from "redux";
import { AppState } from "./rootReducer";
import { EventActions } from "socket/eventActions";

type StartupMiddlewareDependencies = SocketDependency & {
  eventActions: EventActions;
};

export const initialStartupMiddlware = ({
  socketService,
  eventActions
}: StartupMiddlewareDependencies): Middleware<
  {},
  AppState
> => store => next => action => {
  if (action.type === INITIAL_STARTUP) {
    console.info("Application has started ");
    createSocketSubscriptions(store.dispatch, eventActions);
  }
  return next(action);
};
