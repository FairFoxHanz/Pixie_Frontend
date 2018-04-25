import "./style.css";
import React, { Component } from "react";
import { fetchEvents } from "../../actions";
import EventTableRow from "./components/EventTableRow";
import { connect } from "react-redux";
import moment from "moment";
import TooltippedButton from "../../components/Tooltipped/TooltippedButton";
import TooltippedLink from "../../components/Tooltipped/TooltippedLink";
import Loader from "../../components/Loader";

class HostedEvents extends Component {
  constructor(props) {
    super(props);
    this.props.fetchEvents();
  }

  renderEventsTable(events) {
    if (!events) {
      return (
        <table className="highlight">
          <tbody>
            <tr>
              <td>
                <div className="center">
                  <Loader />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      );
    } else if (events.length === 0) {
      return (
        <table className="highlight">
          You have not created any events yet.
        </table>
      );
    } else {
      return (
        <table className="highlight">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Place</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>{this.renderEventRow(events)}</tbody>
        </table>
      );
    }
  }

  renderEventRow(events) {
    moment.locale("pl");
    if (events) {
      return events.map(event => {
        return <EventTableRow key={event._id} event={event} />;
      });
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
          {this.renderEventsTable(this.props.events)}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ events }) {
  return { events };
}

export default connect(mapStateToProps, { fetchEvents })(HostedEvents);
