import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createEvent } from "../../../../actions";
import renderField from "./renderField";
import EventDatePicker from "./EventDatePicker";
import formFields from "./formFields";
import EventInventory from "./EventInventory";
import validate from "./validate";

class EventForm extends Component {
  renderFields() {
    return _.map(formFields, ({ name, label }) => (
      <Field
        key={name}
        component={renderField}
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
          <Field
            key="date"
            component={EventDatePicker}
            type="text"
            label="Date"
            name="date"
          />
          <EventInventory label="Inventory" />
          <Link
            to="/host"
            onClick={() =>
              createEvent(this.props.formValues, this.props.history)
            }
            className="teal btn-flat right white-text blue cyan"
          >
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

function mapStateToProps(state) {
  return { formValues: { ...state.form.eventForm.values } };
}

export default reduxForm({
  validate,
  destroyOnUnmount: false,
  form: "eventForm"
})(connect(mapStateToProps, { createEvent })(EventForm));
