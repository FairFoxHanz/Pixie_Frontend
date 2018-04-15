import { FETCH_GUESTS } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_GUESTS: {
      return action.payload;
    }
    default:
      return state;
  }
}
