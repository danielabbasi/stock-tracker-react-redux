import { combineReducers } from "redux";
import { chartReducer } from "../features/chart/redux/chartReducer";
import { errorReducer } from "../features/error/redux/errorReducer"

import { reducer } from "./reducer";

export const rootReducer = combineReducers({reducer: reducer, chart: chartReducer, error: errorReducer})