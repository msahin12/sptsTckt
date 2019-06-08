/**
 * Unit testing of Sagas.
 */

import  eventSaga, {FetchEvents } from "../sagas/eventSaga";
import { takeEvery } from "redux-saga/effects";
import * as ActionTypes from "../actions/ActionTypes";

describe("SAGAS", () => {
  it('should dispatch action "FETCH_EVENTSS" ', () => {
    const generator = eventSaga();
    expect(generator.next().value).toEqual(
      takeEvery(ActionTypes.FETCH_EVENTS, FetchEvents)
    );
  });
});

