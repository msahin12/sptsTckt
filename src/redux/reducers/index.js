/*
 *
 * Events reducer
 *
 */
import * as ActionTypes from "../actions/ActionTypes";

const initialState = {
  events: [],
  loading: false
};

function rootReducer(state = initialState, action) {
  console.log("rootReducer içinden action");
  console.log(action);

  switch (action.type) {
    case ActionTypes.LOADING_STARTED:
      return Object.assign({}, state, {
        loading: true
      });
    case ActionTypes.LOADING_FINISHED:
      return Object.assign({}, state, {
        loading: false
      });
    case ActionTypes.FETCH_EVENTS_ERROR:
      return Object.assign({}, state, {
        events: action.payload
      });
    case ActionTypes.FETCH_EVENTS:
      return state;
    case ActionTypes.FETCH_EVENTS_COMPLETED:
      return Object.assign({}, state, {
        events: action.events
      });
    case ActionTypes.PAGINATION_STARTED:
      return Object.assign({}, state, {
        events: action.payload
      });
    case ActionTypes.PAGINATION_COMPLETED:
      return Object.assign({}, state, {
        events: action.payload
      });
    default:
      console.log("reducer içi alt son state");
      console.log(state);
      return state;
  }
}

export default rootReducer;
