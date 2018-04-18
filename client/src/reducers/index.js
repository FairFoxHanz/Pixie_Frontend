import { combineReducers } from "redux";
import authReducer from "./authReducer";
import eventsReducer from "./eventsReducer";
import displayedEventReducer from "./displayedEventReducer";
import invitationsReducer from "./invitationsReducer";
import usersReducer from "./usersReducer";
import guestsReducer from "./guestsReducer";
import { reducer as reduxForm } from "redux-form";

export default combineReducers({
  events: eventsReducer,
  users: usersReducer,
  invitations: invitationsReducer,
  displayedEvent: displayedEventReducer,
  guests: guestsReducer,
  auth: authReducer,
  form: reduxForm
});
