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

// only using any here cause it is a one off! Don't moan
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(...middleware))
);
