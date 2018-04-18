import "./Modal.css";
import React from "react";
import { fetchUsers } from "../../../../actions";
import Modal from "./Modal";
import { connect } from "react-redux";

class InviteGuestsModal extends React.Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  filterInvitedUsers() {
    const filteredUsers = this.props.users.filter(user => {
      for (let guest of this.props.guests) {
        if (guest.id === user._id) {
          return false;
        }
      }
      return true;
    });
    return filteredUsers;
  }

  renderUsers() {
    const users = this.filterInvitedUsers();
    if (users) {
      return (
        <ul className="collection">
          {users.map(user => {
            return (
              <li key={user._id} className="collection-item">
                {user.name}
              </li>
            );
          })}
        </ul>
      );
    } else return;
  }

  render() {
    return (
      <Modal
        modalTitle={"Invite Guests"}
        onClose={this.props.onClose}
        show={this.props.show}
      >
        {this.props.users && this.props.guests ? this.renderUsers() : "Loading"}
      </Modal>
    );
  }
}

function mapStateToProps({ users, guests }) {
  return {
    users,
    guests
  };
}

export default connect(mapStateToProps, { fetchUsers })(InviteGuestsModal);
