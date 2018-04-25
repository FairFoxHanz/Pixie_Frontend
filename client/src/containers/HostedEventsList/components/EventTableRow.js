import "./EventTableRow.css";
import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import HoverableComponent from "../../../components/HoverableComponent";

class EventTableRow extends HoverableComponent {
  render() {
    return (
      <tr
        className="event-row"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <td>{this.props.event.name}</td>
        <td>{this.props.event.place}</td>
        <td>{moment(this.props.event.eventDate).format("YYYY-MM-DD HH:mm")}</td>
        <td>
          {(this.state.isHovering && (
            <Link to={`/event/${this.props.event._id}`}>Show</Link>
          )) || <span className="row-button">Show</span>}
        </td>
      </tr>
    );
  }
}

export default EventTableRow;
