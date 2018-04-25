import React from "react";
import TooltippedButton from "../../../components/Tooltipped/TooltippedButton";
import HoverableComponent from "../../../components/HoverableComponent";
import Loader from "../../../components/Loader";
import InviteGuestsModal from "../modals/container/InviteGuestsModal";
import ProvidedInventory from "../components/ProvidedInventory";
import { connect } from "react-redux";
import { removeInvitation, cancelItem, fetchGuests } from "../../../actions";

class EventGuests extends HoverableComponent {
  constructor(props) {
    super(props);
    this.cancelProvidedItem = this.cancelProvidedItem.bind(this);
  }
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
    if (!this.props.guests) {
      return (
        <div className="center">
          <Loader size="small" />
        </div>
      );
    }
    if (this.props.guests.length === 0) {
      return <p>No guests are invited yet</p>;
    } else {
      return (
        <ul className="collection with-header">
          <li className="collection-header">Name</li>

          {this.props.guests.map(guest => {
            const isInventoryOwner = guest.id === this.props.auth._id;
            console.log(guest);
            return (
              <li key={guest.invitationId} className="collection-item row">
                {this.props.isUserAnOwner && (
                  <div className="col s2">
                    <TooltippedButton
                      className="btn-floating btn-small waves-effect waves-light red"
                      title="Cancel invitation"
                      icon="close"
                      onClick={() =>
                        this.props.removeInvitation(guest.invitationId)
                      }
                    />
                  </div>
                )}
                <div className={`col s${this.props.isUserAnOwner ? "4" : "6"}`}>
                  {guest.name}
                </div>
                <ProvidedInventory
                  onCancelItem={this.cancelProvidedItem}
                  isOwner={isInventoryOwner}
                  inventory={guest.inventoryAccepted}
                />
              </li>
            );
          })}
        </ul>
      );
    }
  }

  cancelProvidedItem(itemId) {
    this.props.cancelItem(
      this.props.displayedEvent._id,
      itemId,
      this.props.fetchGuests
    );
  }
}
function mapStateToProps(state) {
  return {
    displayedEvent: state.displayedEvent,
    guests: state.guests,
    auth: state.auth
  };
}

export default connect(mapStateToProps, {
  removeInvitation,
  cancelItem,
  fetchGuests
})(EventGuests);
