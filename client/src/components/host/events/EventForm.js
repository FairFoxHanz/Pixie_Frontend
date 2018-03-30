import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {createEvent} from "../../../actions";
import EventField from "./EventField";
import formFields from "./formFields";

class EventForm extends Component {
  
  renderFields() {
        return _.map(formFields, ({ name, label }) => (
          <Field
            key={name}
            component={EventField}
            type="text"
            label={label}
            name={name}
          />
        ));
      }
    
      render() {
        return (
          <div>
            <form>
              {this.renderFields()}
              <Link to="/host" onClick={() => createEvent(this.props.formValues, this.props.history)} className="teal btn-flat right white-text blue cyan">
                Submit <i className="material-icons right">done</i>
              </Link>
              <Link className="red btn-flat white-text pink accent-3" to="/host">
                Cancel
              </Link>
            </form>
          </div>
        );
      }
}

function validate(values) {
    const errors = {};
  
    _.forEach(formFields, ({ name }) => {
      if (!values[name]) {
        errors[name] = `You must provide ${name}!`;
      }
    });
  
    return errors;
  }

  function mapStateToProps(state) {
    return { formValues: state.form.eventForm.values };
  }

export default reduxForm({
    validate,
    destroyOnUnmount: false,
    form: "eventForm"
  })(connect(mapStateToProps, {createEvent})(EventForm));
  