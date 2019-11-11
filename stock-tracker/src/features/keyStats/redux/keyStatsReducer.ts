import {
  SET_RESPONSE,
  SET_LOADING_KEYSTATS,
  SET_ERROR_KEYSTATS
} from "./actionTypes";
import { Reducer } from "redux";
import { ResponseData, KeyStatsActions } from "./actions";

export interface KeyStatsState {
  response: ResponseData | undefined;
  loading: boolean;
  error: boolean;
}

const initialState: KeyStatsState = {
  response: undefined,
  loading: false,
  error: false
};

export const keyStatsReducer: Reducer<
  Readonly<KeyStatsState>,
  KeyStatsActions
> = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_KEYSTATS:
      return {
        ...initialState,
        loading: true
      };
    case SET_RESPONSE:
      return {
        ...state,
        response: action.payload,
        loading: false,
        error: false
      };
    case SET_ERROR_KEYSTATS:
      return {
        ...state,
        error: true,
        loading: false
      };
    default:
      return state;
  }
};
