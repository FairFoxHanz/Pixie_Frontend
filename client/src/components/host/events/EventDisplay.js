import React, { Component } from "react";
import { connect } from "react-redux";
import EventForm from "./EventForm";

class EventDisplay extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <div className="events-list-title">
            <h5>New Event</h5>
          </div>
          <br />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    event: state.displayedEvent
  };
}

export default connect(mapStateToProps)(EventNew);
