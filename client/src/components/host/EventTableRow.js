import "./EventTableRow.css";
import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

class EventTableRow extends Component {
  constructor(props) {
    super(props);
    this.event = props.event;
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
        <td>{this.event.name}</td>
        <td>{this.event.place}</td>
        <td>{moment(this.event.eventDate).format("YYYY-MM-DD HH:mm")}</td>
        <td>
          {(this.state.isHovering && (
            <Link to={`/host/event/${this.event._id}`}>Show</Link>
          )) || <span className="row-button">Show</span>}
        </td>
      </tr>
    );
  }
}

export default EventTableRow;
