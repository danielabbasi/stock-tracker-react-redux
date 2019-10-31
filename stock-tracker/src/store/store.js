import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./rootReducer";
import { initialStartupMiddlware } from "./initialStartupMiddleware";
import { searchMiddleware } from "../features/search/redux/searchMiddleware";
import { chartMiddleware } from "../features/chart/redux/chartMiddleware";
import { socketService } from "../socket";

const middlwares = [
  initialStartupMiddlware({ socketService }),
  searchMiddleware({ socketService }),
  chartMiddleware({ socketService })
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(...middlwares))
);
