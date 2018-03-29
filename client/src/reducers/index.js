import { combineReducers } from 'redux';
import authReducer from './authReducer';
import eventsReducer from './eventsReducer';
import { reducer as reduxForm} from 'redux-form'; 

export default combineReducers({
    events: eventsReducer,
    auth: authReducer,
    form: reduxForm
});