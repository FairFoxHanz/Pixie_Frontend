import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEvent } from "../../../actions";
import { Link } from "react-router-dom";

class EventDisplay extends Component {
  componentWillMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
  }

  renderDetails(event) {
    console.log(event);
    return (
      <div>
        <div>Event name: {event.name};</div>
        <div>Event place: {event.place};</div>
        <div>Event date: {event.eventDate};</div>
      </div>
    );
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <Link to={`/host`}>
            <i className="material-icons">arrow_back</i>
          </Link>
          <div className="events-list-title">
            <h5>Event Details</h5>
          </div>
          {this.props.event ? (
            this.renderDetails(this.props.event)
          ) : (
            <div> Loading event... </div>
          )}
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

export default connect(mapStateToProps, { fetchEvent })(EventDisplay);
