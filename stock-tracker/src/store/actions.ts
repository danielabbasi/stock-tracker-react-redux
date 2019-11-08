import { INITIAL_STARTUP } from "./actionTypes";
import { Action } from "../utils/actions";

export type InitialStartup = Action<typeof INITIAL_STARTUP>;

export const initialStartupAction = (): InitialStartup => ({
  type: INITIAL_STARTUP
});
