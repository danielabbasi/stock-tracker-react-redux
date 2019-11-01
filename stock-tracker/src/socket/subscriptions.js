import { socketService } from ".";
import { eventActions } from "./eventActions";

export const createSocketSubscriptions = dispatch => {
  socketService.create();
  const unsubscribeSockets = eventActions.map(([event, actionCreator]) =>
    socketService.createSocketSubscription(event, payload =>
      dispatch(actionCreator(payload))
    )
  );
  return () => unsubscribeSockets.forEach(fn => fn());
};
