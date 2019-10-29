import { INITIAL_STARTUP, RESET } from "./actionTypes";

export const initialStartupAction = () => ({ type: INITIAL_STARTUP });

export const resetAction = () => ({ type: RESET });
