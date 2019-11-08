import { peersReducer, TopPeersState } from "./peersReducer";
import {
  ADD_TOP_PEERS,
  SET_LOADING_PEERS,
  SET_ERROR_PEERS
} from "./actionTypes";
import { SetTopPeers, SetLoadingPeers, SetErrorPeers } from "./actions";

const setupInitialState = (): TopPeersState => ({
  topPeers: [],
  loading: false,
  error: false
});

describe("testing Company Overview Reducer", () => {
  // describe("when given an unknown/invalid action", () => {
  //   let initialState: TopPeersState;
  //   let newState: TopPeersState;
  //   beforeAll(() => {
  //     initialState = setupInitialState();
  //     const action = { type: "UNKNOWN_ACTION" };
  //     newState = peersReducer(initialState, action);
  //   });
  //   it("should not change the initial state", () => {
  //     expect(newState).toBe(initialState);
  //   });
  // });
  describe('when given the "ADD_TOP_PEERS" action', () => {
    let initialState: TopPeersState;
    let newState: TopPeersState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetTopPeers = {
        type: ADD_TOP_PEERS,
        payload: ["GOOG", "ECOR", "TESS"]
      };
      newState = peersReducer(initialState, action);
    });
    it("should update the top peers state", () => {
      expect(newState.topPeers).toEqual(["GOOG", "ECOR", "TESS"]);
    });
  });
  describe("when given the SET_LOADING_PEERS action", () => {
    let initialState: TopPeersState;
    let newState: TopPeersState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetLoadingPeers = {
        type: SET_LOADING_PEERS
      };
      newState = peersReducer(initialState, action);
    });
    it("should update the loading state", () => {
      expect(newState.loading).toEqual(true);
    });
  });
  describe("when given the SET_ERROR_PEERS action", () => {
    let initialState: TopPeersState;
    let newState: TopPeersState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetErrorPeers = {
        type: SET_ERROR_PEERS
      };
      newState = peersReducer(initialState, action);
    });
    it("should update the error state", () => {
      expect(newState.error).toEqual(true);
    });
  });
});
