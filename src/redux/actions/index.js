import * as ActionTypes from "./ActionTypes";

export function fetchEventsAction() {
  console.log("fetchEventsAction çağrıldı");
  return {
    type: ActionTypes.FETCH_EVENTS
  };
}

export function fetchEventsCompletedAction(events) {
  console.log("fetchEventsCompletedAction çağrıldı");

  return {
    type: ActionTypes.FETCH_EVENTS_COMPLETED,
    events
  };
}

export function fetchErrorAction(error) {
  return {
    type: ActionTypes.FETCH_EVENTS_ERROR,
    payload: error
  };
}
export function loadStartAction() {
  console.log("loadStartAction çağrıldı");

  return {
    type: ActionTypes.LOADING_STARTED
  };
}

export function loadEndAction() {
  console.log("loadEndAction çağrıldı");

  return {
    type: ActionTypes.LOADING_FINISHED
  };
}

export function paginationAction(pagination) {
  return {
    type: ActionTypes.PAGINATION_STARTED,
    payload: pagination
  };
}

export function paginationDoneAction(events) {
  return {
    type: ActionTypes.PAGINATION_COMPLETED,
    payload: events
  };
}
