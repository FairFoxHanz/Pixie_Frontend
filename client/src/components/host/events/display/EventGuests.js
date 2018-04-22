import React from "react";
import TooltippedButton from "../../../TooltippedButton";
import StateComponent from "../../../StateComponent";
import Loader from "../../../Loader";
import InviteGuestsModal from "./InviteGuestsModal";

class EventGuests extends StateComponent {
  render() {
    return (
      <div className="row">
        <div className="col s12 m12">
          <div
            className="card"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            {this.props.isUserAnOwner && (
              <TooltippedButton
                className="btn-floating btn-small waves-effect waves-light red right edit-button"
                icon="add"
                title="Add Guests"
                onClick={this.toggleModal}
              />
            )}
            <InviteGuestsModal
              show={this.state.isOpen}
              onClose={this.toggleModal}
            />
            <div className="card-content">
              <div className="card-title">Guests</div>
              {this.renderGuestsTable(this.props.guests)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderGuestsTable(guests) {
    if (!guests) {
      return (
        <div className="center">
          <Loader size="small" />
        </div>
      );
    }
    if (guests.length === 0) {
      return <p>No guests are invited yet</p>;
    } else {
      return (
        <table className="highlight">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {guests.map(guest => {
              return (
                <tr key={guest.id}>
                  <td>{guest.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  }
}

export default EventGuests;