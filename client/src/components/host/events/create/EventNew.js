import React, { Component } from "react";
import { reduxForm } from "redux-form";
import EventForm from "./EventForm";

class EventNew extends Component {
  renderContent() {
    return (
      <div className="card">
        <div className="card-content">
          <div className="events-list-title">
            <h5>New Event</h5>
          </div>
          <br />
          <EventForm />
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "eventForm"
})(EventNew);
