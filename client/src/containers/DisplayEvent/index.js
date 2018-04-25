import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEvent, fetchGuests } from "../../actions";
import { Link } from "react-router-dom";
import EventGuests from "./containers/EventGuests";
import TooltippedButton from "../../components/Tooltipped/TooltippedButton";
import EventInventory from "./containers/EventInventory";
import EventDetails from "./containers/EventDetails";
import Loader from "../../components/Loader";

class DisplayEventPage extends Component {
  componentWillMount() {
    this.props.fetchEvent(this.props.match.params.eventId);
    this.props.fetchGuests(this.props.match.params.eventId);
  }

  renderDetails(event, guests = [], isUserAnOwner) {
    return (
      <div>
        <div className="events-list-title">
          <h5>
            {event.name}
            <TooltippedButton
              title="Refresh events list"
              onClick={() => {
                this.props.fetchEvent(this.props.match.params.eventId);
                this.props.fetchGuests(this.props.match.params.eventId);
              }}
              className="btn-floating btn-small waves-effect waves-light cyan right"
              icon="refresh"
            />
          </h5>
        </div>
        <EventDetails event={event} isUserAnOwner={isUserAnOwner} />
        <EventGuests guests={guests} isUserAnOwner={isUserAnOwner} />
        <EventInventory
          inventory={event.inventory}
          isUserAnOwner={isUserAnOwner}
          provideInventoryCallback={() =>
            this.props.fetchGuests(this.props.match.params.eventId)
          }
        />
      </div>
    );
  }

  render() {
    let isUserAnOwner;
    if (this.props.event) {
      isUserAnOwner = this.props.auth._id === this.props.event._user;
    }
    return (
      <div className="card">
        <div className="card-content">
          <Link to={isUserAnOwner ? "/host" : "/guest"}>
            <i className="material-icons">arrow_back</i>
          </Link>
          {this.props.event ? (
            this.renderDetails(
              this.props.event,
              this.props.guests,
              isUserAnOwner
            )
          ) : (
            <div className="center">
              <Loader />
            </div>
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
  DisplayEventPage
);
