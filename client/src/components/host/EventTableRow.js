import "./EventTableRow.css";
import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import StateComponent from "../StateComponent"

class EventTableRow extends StateComponent {
  constructor(props) {
    super(props);
    this.event = props.event;
  }

  render() {
    return (
      <tr
        className="event-row"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <td>{this.event.name}</td>
        <td>{this.event.place}</td>
        <td>{moment(this.event.eventDate).format("YYYY-MM-DD HH:mm")}</td>
        <td>
          {(this.state.isHovering && (
            <Link to={`/event/${this.event._id}`}>Show</Link>
          )) || <span className="row-button">Show</span>}
        </td>
      </tr>
    );
  }
}

export default EventTableRow;
