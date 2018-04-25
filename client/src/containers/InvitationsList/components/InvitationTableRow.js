import "./InvitationTableRow.css";
import React from "react";
import HoverableComponent from "../../../components/HoverableComponent";
import moment from "moment";
import { Link } from "react-router-dom";

class InvitationTableRow extends HoverableComponent {
  render() {
    const invitation = this.props.invitation;
    return (
      <tr
        className="event-row"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <td>{invitation.eventName}</td>
        <td>{invitation.eventPlace}</td>
        <td>{moment(invitation.eventDate).format("YYYY-MM-DD HH:mm")}</td>
        <td>
          {invitation.invitation.inventoryAsked.length > 0 ? "Yes" : "No"}
        </td>
        <td>
          {(this.state.isHovering && (
            <Link to={`/event/${invitation.invitation.eventId}`}>Show</Link>
          )) || <span className="row-button">Show</span>}
        </td>
      </tr>
    );
  }
}

export default InvitationTableRow;
