import "./HostedEvents.css";
import React, { Component } from "react";
import { fetchEvents } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class HostedEvents extends Component {
  constructor(props) {
    super(props);
    this.props.fetchEvents();
  }

  renderEventsList() {
      console.log(this.props.events);
    if (this.props.events) {
      return this.props.events.map(event => {
        return (
          <tr key={event._id}>
            <td>{event.name}</td>
            <td>{event.place}</td>
            <td>{event.eventDate}</td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td>Loading events...</td>
        </tr>
      );
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <div className="events-list-title">
            <h5 className="left">Hosted Events</h5>
            <Link
              to="/host/create"
              className="btn-floating btn-small waves-effect waves-light pink accent-3 right"
            >
              <i className="material-icons">add</i>
            </Link>
          </div>
          <table className="highlight">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Place</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>{this.renderEventsList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ events }) {
  return { events };
}

export default connect(mapStateToProps, { fetchEvents })(HostedEvents);
