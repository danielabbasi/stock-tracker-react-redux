import { socketService } from "./socketService";
import { EventActions, ApplicationActions } from "./eventActions";
import { Dispatch } from "redux";

export const createSocketSubscriptions = (
  dispatch: Dispatch<ApplicationActions>,
  eventActions: EventActions
) => {
  socketService.create();
  const unsubscribeSockets = eventActions.map(
    ({ event, action, errorAction }) =>
      socketService.createSocketSubscription(event, payload => {
        if (payload.isError) {
          dispatch(errorAction(payload.isError));
        } else {
          dispatch(action(payload.data));
        }
      })
  );
  return () => unsubscribeSockets.forEach(fn => fn());
};
