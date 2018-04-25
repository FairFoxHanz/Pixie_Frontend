import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createEvent } from "../../../actions";
import FormField from "../components/FormField";
import EventDatePicker from "../components/EventDatePicker";
import InventoryForm from "../components/InventoryForm";
import validate from "../helpers/validate";

class EventForm extends Component {
  render() {
    return (
      <div>
        <form>
          <Field
            key="name"
            component={FormField}
            type="text"
            label="Event name"
            name="name"
          />
          <Field
            key="place"
            component={FormField}
            type="text"
            label="Place"
            name="place"
          />
          <Field
            key="date"
            component={EventDatePicker}
            type="text"
            label="Date"
            name="date"
          />
          <InventoryForm label="Inventory" />
          <Link
            to="/host"
            onClick={() =>
              createEvent(this.props.formValues, this.props.history)
            }
            className="btn-flat right white-text cyan"
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
