import { combineReducers } from "redux";
// import { chartReducer } from "../features/chart/redux/chartReducer";
import { reducer } from "./reducer";

const rootReducer = combineReducers({reducer: reducer})


 export default rootReducer