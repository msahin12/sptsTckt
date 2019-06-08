

  import { all } from 'redux-saga/effects';

import eventSaga from './eventSaga';

export default function* rootSaga() {
    yield all([eventSaga()]);
}
