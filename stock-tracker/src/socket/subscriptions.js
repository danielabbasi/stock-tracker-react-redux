import { socketService } from ".";
import { eventActions } from "./eventActions";

export const createSocketSubscriptions = dispatch => {
  socketService.create();
  const unsubscribeSockets = eventActions.map(
    ([event, actionCreator, errorActionCreator]) =>
      socketService.createSocketSubscription(event, payload => {
        if (payload.data) {
          dispatch(actionCreator(payload.data));
        } else {
          dispatch(errorActionCreator(payload.isError));
        }
      })
  );
  return () => unsubscribeSockets.forEach(fn => fn());
};
