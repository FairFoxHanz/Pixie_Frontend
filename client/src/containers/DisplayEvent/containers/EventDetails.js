import "./EventDetails.css";
import React from "react";
import TooltippedButton from "../../../components/Tooltipped/TooltippedButton";
import HoverableComponent from "../../../components/HoverableComponent";
import EditEventDetailsModal from "../modals/container/EditEventDetailsModal";

class EventDetails extends HoverableComponent {
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
                className="btn-floating btn-small waves-effect waves-light cyan right edit-button"
                icon="edit"
                title="Edit Event"
                onClick={this.toggleModal}
              />
            )}
            <EditEventDetailsModal
              show={this.state.isOpen}
              onClose={this.toggleModal}
            />
            <div className="card-content">
              <div className="card-title">
                <span>Event Details </span>
              </div>

              <ul className="collection">
                <li className="collection-item">
                  Place: <p className="right">{this.props.event.place}</p>
                </li>
                <li className="collection-item">
                  Date: <p className="right">{this.props.event.eventDate}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventDetails;
