import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEvent, fetchGuests } from "../../../../actions";
import { Link } from "react-router-dom";
import renderGuests from "./renderGuests";
import renderInventory from "./renderInventory";
import renderDetails from "./renderDetails";
import Loader from "../../../Loader";

class EventDisplay extends Component {
  componentWillMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
    this.props.fetchGuests(this.props.match.params.eventId);
  }

  renderDetails(event, guests = []) {
    console.log(event);
    return (
      <div>
        <div className="events-list-title">
            <h5>{event.name}</h5>
          </div>
        {renderDetails(event)}
        {renderGuests(guests)}
        {renderInventory(event.inventory)}
      </div>
    );
  }

  render() {
    let isUserAnOwner;
    if(this.props.event){
    isUserAnOwner = this.props.auth._id === this.props.event._user;
  }
    return (
      <div className="card">
        <div className="card-content">
          <Link to={(isUserAnOwner?'/host':'/guest')}>
            <i className="material-icons">arrow_back</i>
          </Link>
          {this.props.event ? (
            this.renderDetails(this.props.event, this.props.guests)
          ) : (
            <div className="center"><Loader /></div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    event: state.displayedEvent,
    guests: state.guests
  };
}

export default connect(mapStateToProps, { fetchEvent, fetchGuests })(
  EventDisplay
);
