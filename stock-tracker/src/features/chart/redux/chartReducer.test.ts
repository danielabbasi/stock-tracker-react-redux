import { chartReducer, ChartState } from "./chartReducer";
import {
  SET_CHART_DATA,
  SET_CHART_TIME,
  LOADING_CHART,
  SET_ERROR_CHART
} from "./actionTypes";
import {
  SetChartData,
  SetChartTime,
  SetChartLoading,
  SetChartError
} from "./actions";

const setupInitialState = (): ChartState => ({
  chartData: [],
  chartTime: "1Y",
  loading: false,
  error: false
});

describe("testing chart reducer", () => {
  // describe("when given unknown/invalid action", () => {
  //   let initialState: ChartState;
  //   let newState: ChartState;
  //   beforeAll(() => {
  //     initialState = setupInitialState();
  //     const action = { type: "UNKNOWN_ACTION" };
  //     newState = chartReducer(initialState, action);
  //   });
  //   it("should not change the initial state", () => {
  //     expect(newState).toBe(initialState);
  //   });
  // });
  describe("when given SET_CHART_DATA action", () => {
    let initialState: ChartState;
    let newState: ChartState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetChartData = {
        type: SET_CHART_DATA,
        payload: [
          { close: 187.1, date: "2018/04/14" },
          { close: 69, date: "2018/12/02" }
        ]
      };
      newState = chartReducer(initialState, action);
    });
    it("should update the chart data state", () => {
      expect(newState.chartData).toEqual([
        { close: 187.1, date: "2018/04/14" },
        { close: 69, date: "2018/12/02" }
      ]);
    });
  });
  describe('when given the "SET_CHART_TIME" action', () => {
    let initialState: ChartState;
    let newState: ChartState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetChartTime = {
        type: SET_CHART_TIME,
        payload: "5Y"
      };
      newState = chartReducer(initialState, action);
    });
    it("should update the chart time state", () => {
      expect(newState.chartTime).toEqual("5Y");
    });
  });
  describe("when given the LOADING_CHART action", () => {
    let initialState: ChartState;
    let newState: ChartState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetChartLoading = {
        type: LOADING_CHART
      };
      newState = chartReducer(initialState, action);
    });
    it("should update the loading state", () => {
      expect(newState.loading).toEqual(true);
    });
  });
  describe("when given the SET_ERROR_CHART action", () => {
    let initialState: ChartState;
    let newState: ChartState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetChartError = {
        type: SET_ERROR_CHART
      };
      newState = chartReducer(initialState, action);
    });
    it("should update the error state", () => {
      expect(newState.error).toEqual(true);
    });
  });
});
