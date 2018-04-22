import { FETCH_EVENT, FETCH_EVENTS } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_EVENT: {
      return action.payload;
    }
    case FETCH_EVENTS: {
      return null;
    }
    default:
      return state;
  }
}
