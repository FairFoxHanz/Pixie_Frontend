import "./HostedEvents.css";
import "react-tippy/dist/tippy.css";
import React, { Component } from "react";
import { fetchEvents } from "../../actions";
import EventTableRow from "./EventTableRow";
import { connect } from "react-redux";
import moment from "moment";
import TooltippedButton from "../TooltippedButton";
import TooltippedLink from "../TooltippedLink";

class HostedEvents extends Component {
  constructor(props) {
    super(props);
    this.props.fetchEvents();
  }

  renderEventsList() {
    moment.locale("pl");
    if (this.props.events) {
      return this.props.events.map(event => {
        return <EventTableRow key={event._id} event={event} />;
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
            <TooltippedLink
              title="Create new event"
              icon="add"
              className="btn-floating btn-small waves-effect waves-light pink accent-3 right"
              to="/host/create"
            />
            <TooltippedButton
              title="Refresh events list"
              onClick={() => {
                this.props.fetchEvents();
              }}
              className="btn-floating btn-small waves-effect waves-light cyan right refresh-button"
              icon="refresh"
            />
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
