import { socketService } from ".";
import { eventActions } from "./eventActions";
import { Dispatch } from "redux";

type Payload = {
  isError: boolean;
  data: any;
};

export const createSocketSubscriptions = (dispatch: Dispatch) => {
  socketService.create();
  const unsubscribeSockets = eventActions.map(
    ({ event: actionName, action, errorAction }) =>
      socketService.createSocketSubscription(actionName, (payload: Payload) => {
        if (payload.isError) {
          dispatch(errorAction(payload.isError));
        } else {
          dispatch(action(payload.data));
        }
      })
  );
  return () => unsubscribeSockets.forEach(fn => fn());
};
