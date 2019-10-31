import { INITIAL_STARTUP } from "./actionTypes";
import { createSocketSubscriptions } from "./subscriptions";

export const initialStartupMiddlware = ({
  socketService
}) => store => next => action => {
  if (action.type === INITIAL_STARTUP) {
    console.info("Application has started ");
    createSocketSubscriptions(store.dispatch);
  }
  const result = next(action);
  return result;
};
