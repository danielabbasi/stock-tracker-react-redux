import { socketService } from ".";
import { eventActions } from "./eventActions";

export const createSocketSubscriptions = dispatch => {
  socketService.create();
  const unsubscribeSockets = eventActions.map(
    ([event, actionCreator, errorActionCreator]) =>
      socketService.createSocketSubscription(event, payload => {
        if (payload.isError) {
          dispatch(errorActionCreator(payload.isError));
        } else {
          dispatch(actionCreator(payload.data));
        }
      })
  );
  return () => unsubscribeSockets.forEach(fn => fn());
};
