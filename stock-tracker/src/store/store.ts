import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./rootReducer";
import { initialStartupMiddlware } from "./initialStartupMiddleware";
import { searchMiddleware } from "../features/search";
import { chartMiddleware } from "../features/chart";
import { socketService } from "../socket";
import { eventActions } from "../socket/eventActions";

const middleware = [
  initialStartupMiddlware({ socketService, eventActions }),
  searchMiddleware({ socketService }),
  chartMiddleware({ socketService })
];

// Module augmentation - Redux devtools extension compose exists in a dev environment when using Redux DevTools
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(...middleware))
);
