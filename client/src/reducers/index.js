import { combineReducers } from "redux";
import authReducer from "./authReducer";
import eventsReducer from "./eventsReducer";
import displayedEventReducer from "./displayedEventReducer";
import invitationsReducer from "./invitationsReducer";
import { reducer as reduxForm } from "redux-form";

export default combineReducers({
  events: eventsReducer,
  invitations: invitationsReducer,
  displayedEvent: displayedEventReducer,
  auth: authReducer,
  form: reduxForm
});
