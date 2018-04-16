import "./InvitationsList.css";
import "react-tippy/dist/tippy.css";
import React, { Component } from "react";
import { fetchInvitations } from "../../actions";
import InvitationTableRow from "./InvitationTableRow";
import { connect } from "react-redux";
import moment from "moment";
import TooltippedButton from "../TooltippedButton";
import Loader from "../Loader";

class InvitationsList extends Component {
  constructor(props) {
    super(props);
    this.props.fetchInvitations();
  }

  renderInvitationsTable(invitations) {
    if (!invitations) {
      return (
        <table className="highlight">
          <tbody>
            <tr>
              <td>
                <div className="center">
                  <Loader />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      );
    } else if (invitations.length === 0) {
      return (
        <table className="highlight">
          <span>You have no invitations yet...</span>
        </table>
      );
    } else
      return (
        <table className="highlight">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Place</th>
              <th>Date</th>
              <th>Inventory</th>
            </tr>
          </thead>
          <tbody>{this.renderInvitationRows(invitations)}</tbody>
        </table>
      );
  }

  renderInvitationRows(invitations) {
    moment.locale("pl");
    if (invitations) {
      if (invitations.length > 0) {
        return invitations.map(invitation => {
          return (
            <InvitationTableRow key={invitation.invitation._id} invitation={invitation} />
          );
        });
      }
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
          {this.renderInvitationsTable(this.props.invitations)}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ invitations }) {
  return { invitations };
}

export default connect(mapStateToProps, { fetchInvitations })(InvitationsList);
