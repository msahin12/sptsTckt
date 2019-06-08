import rootReducer from "../reducers";

import * as ActionTypes from "../actions/ActionTypes";

const initialState = {
  events: [],
  loading: false
};

describe("rootReducer", () => {
  it("should return the initial state", () => {
    expect(rootReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FETCH_EVENTS", () => {
    const startAction = {
      type: ActionTypes.FETCH_EVENTS
    };
    expect(rootReducer({}, startAction)).toEqual({});
  });
});
