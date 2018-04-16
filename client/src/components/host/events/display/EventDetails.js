import "./EventDetails.css";
import React from "react";
import TooltippedButton from "../../../TooltippedButton";
import HoveringStateComponent from "../../../HoveringStateComponent";

class EventDetails extends HoveringStateComponent {

  render() {
    return (
      <div className="row">
        <div className="col s12 m12">
          <div
            className="card"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            {this.state.isHovering &&
              this.props.isUserAnOwner && (
               <TooltippedButton
                  className="btn-floating btn-small waves-effect waves-light cyan right edit-button"
                  icon="edit"
                  title="Edit Event"
                  onClick={() => {
                    console.log("Clicked edit event");
                  }}
                />
              )}
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
