import { FETCH_INVITATIONS } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_INVITATIONS: {
      return action.payload;
    }
    default:
      return state;
  }
}
