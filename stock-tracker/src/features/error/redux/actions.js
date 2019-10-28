import { REQUEST_ERROR } from "./actionTypes"

export const getErrorsAction = (requestName) => ({ 
    type: REQUEST_ERROR,
    payload: {requestName}
  })