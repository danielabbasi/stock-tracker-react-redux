import { socketService } from ".";
import { EventActions, ApplicationActions } from "./eventActions";
import { Dispatch } from "redux";
import { ApiPayload } from "utils/payload";

export const createSocketSubscriptions = (
  dispatch: Dispatch<ApplicationActions>,
  eventActions: EventActions
) => {
  socketService.create();
  const unsubscribeSockets = eventActions.map(
    ({ event, action, errorAction }) =>
      socketService.createSocketSubscription(event, (payload: ApiPayload) => {
        if (payload.isError) {
          dispatch(errorAction(payload.isError));
        } else {
          dispatch(action(payload.data));
        }
      })
  );
  return () => unsubscribeSockets.forEach(fn => fn());
};
