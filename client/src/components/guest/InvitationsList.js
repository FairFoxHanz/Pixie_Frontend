import "./InvitationsList.css";
import "react-tippy/dist/tippy.css";
import React, { Component } from "react";
import { fetchInvitations } from "../../actions";
import InvitationTableRow from "./InvitationTableRow";
import { connect } from "react-redux";
import moment from "moment";
import TooltippedButton from "../TooltippedButton";

class InvitationsList extends Component {
  constructor(props) {
    super(props);
    this.props.fetchInvitations();
  }

  renderInvitationList() {
    moment.locale("pl");
    if (this.props.invitations) {
      return this.props.invitations.map(invitation => {
        return <InvitationTableRow key={invitation._id} invitation={invitation} />;
      });
    } else {
      return (
        <tr>
          <td>Loading invitations...</td>
        </tr>
      );
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          <div className="events-list-title">
            <h5 className="left">Invitations</h5>
            <TooltippedButton
              title="Refresh invitations list"
              onClick={() => {
                this.props.fetchInvitations();
              }}
              className="btn-floating btn-small waves-effect waves-light pink cyan right refresh-button"
              icon="refresh"
            />
          </div>
          <table className="highlight">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Place</th>
                <th>Date</th>
                <th>Inventory</th>
              </tr>
            </thead>
            <tbody>{this.renderInvitationList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ invitations }) {
  return { invitations };
}

export default connect(mapStateToProps, { fetchInvitations })(InvitationsList);
