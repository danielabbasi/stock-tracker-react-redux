import { socketService } from ".";
import { EventActions } from "./eventActions";
import { Dispatch } from "redux";
import { ApiPayload } from "../utils/payload";

export const createSocketSubscriptions = (
  dispatch: Dispatch,
  eventActions: EventActions
) => {
  socketService.create();
  const unsubscribeSockets = eventActions.map(
    ({ event: actionName, action, errorAction }) =>
      socketService.createSocketSubscription(
        actionName,
        (payload: ApiPayload) => {
          if (payload.isError) {
            dispatch(errorAction(payload.isError));
          } else {
            dispatch(action(payload.data));
          }
        }
      )
  );
  return () => unsubscribeSockets.forEach(fn => fn());
};
