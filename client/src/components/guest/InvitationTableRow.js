import "./InvitationTableRow.css";
import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

class InvitationTableRow extends Component {
  constructor(props) {
    super(props);
    this.invitation = props.invitation;
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = {
      isHovering: false
    };
  }

  handleMouseEnter() {
    this.setState({ isHovering: true });
  }

  handleMouseLeave() {
    this.setState({ isHovering: false });
  }

  render() {
    return (
      <tr
        className="event-row"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <td>{this.invitation.eventName}</td>
        <td>{this.invitation.eventPlace}</td>
        <td>{moment(this.invitation.eventDate).format("YYYY-MM-DD HH:mm")}</td>
        <td>{(this.invitation.invitation.inventoryAsked.length > 0 ? "Yes" : "No")}</td>
        <td>
          {(this.state.isHovering && (
            <Link to={`/event/${this.invitation.invitation.eventId}`}>Show</Link>
          )) || <span className="row-button">Show</span>}
        </td>
      </tr>
    );
  }
}

export default InvitationTableRow;
