import { take, put, call, takeEvery } from "redux-saga/effects";

import {
  fetchEventsCompletedAction,
  fetchErrorAction,
  loadStartAction,
  loadEndAction
} from "../actions";
import * as ActionTypes from "../actions/ActionTypes";
import { fetchEvents } from "../../helpers/fetchEvents";

export function* FetchEvents() {
  try {

    yield put(loadStartAction());

    const eventsData = yield call(fetchEvents);
    yield put(fetchEventsCompletedAction(eventsData));
    yield put(loadEndAction());
  } catch (error) {
    yield put(fetchErrorAction(error.toString()));
  }
}

export default function* eventSaga() {
  yield takeEvery(ActionTypes.FETCH_EVENTS, FetchEvents);
}
