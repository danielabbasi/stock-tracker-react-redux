import { newsReducer, LatestNewsState } from "./newsReducer";
import { SET_NEWS, SET_LOADING_NEWS, SET_ERROR_NEWS } from "./actionTypes";
import { SetLatestNews, SetLoadingNews, SetErrorNews } from "./actions";

const setupInitialState = (): LatestNewsState => ({
  latestNews: [],
  loading: false,
  error: false
});

describe("testing News Reducer", () => {
  describe('when given the "SET_NEWS" action', () => {
    let initialState: LatestNewsState;
    let newState: LatestNewsState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetLatestNews = {
        type: SET_NEWS,
        payload: [
          {
            headline: "hello",
            datetime: "09/01/2019",
            source: "Financial Times",
            url: "www.helloworld.com"
          }
        ]
      };
      newState = newsReducer(initialState, action);
    });
    it("should update the latestNews state", () => {
      expect(newState.latestNews).toEqual([
        {
          headline: "hello",
          datetime: "09/01/2019",
          source: "Financial Times",
          url: "www.helloworld.com"
        }
      ]);
    });
  });
  describe("when given the SET_LOADING_NEWS action", () => {
    let initialState: LatestNewsState;
    let newState: LatestNewsState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetLoadingNews = {
        type: SET_LOADING_NEWS
      };
      newState = newsReducer(initialState, action);
    });
    it("should update the loading state", () => {
      expect(newState.loading).toEqual(true);
    });
  });
  describe("when given the SET_ERROR_NEWS action", () => {
    let initialState: LatestNewsState;
    let newState: LatestNewsState;
    beforeAll(() => {
      initialState = setupInitialState();
      const action: SetErrorNews = {
        type: SET_ERROR_NEWS
      };
      newState = newsReducer(initialState, action);
    });
    it("should update the error state", () => {
      expect(newState.error).toEqual(true);
    });
  });
});
