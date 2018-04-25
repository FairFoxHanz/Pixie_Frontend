import "./InviteGuestsForm.css";
import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

const InviteGuestsForm = props => {
  const guests = props.guestList;
  return (
    <ul className="collection">
      {guests.map((guest, index) => (
        <li key={index} className="collection-item">
          <div>
            <span>{guest.name}</span>
            <Field
              person={guest}
              name={`${guest._id}.invited`}
              component={renderField}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

const renderField = ({ person, input, label, type }) => {
  return (
    <div className="right">
      <div className="fixed">
        <input {...input} id={person._id} type="checkbox" />
        <label htmlFor={person._id} />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: { ...state.form.inviteGuests } };
}

export default reduxForm({
  form: "inviteGuests"
})(connect(mapStateToProps)(InviteGuestsForm));
