import "./Modal.css";
import React from "react";
import { fetchUsers } from "../../../../actions";
import Modal from "./Modal";
import { connect } from "react-redux";
import InviteGuestsForm from "./InviteGuestsForm";

class InviteGuestsModal extends React.Component {
  componentWillMount() {
    this.props.fetchUsers();
    this.inviteUsers = this.inviteUsers.bind(this);
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
      return <InviteGuestsForm guestList={users} />;
    } else return;
  }

  inviteUsers() {
    this.props.fetchUsers();
    this.props.onClose();
  }

  render() {
    return (
      <Modal
        modalTitle={"Invite Guests"}
        onClose={this.props.onClose}
        onAccept={this.inviteUsers}
        show={this.props.show}
      >
        {this.props.users && this.props.guests ? this.renderUsers() : "Loading"}
      </Modal>
    );
  }
}

function mapStateToProps({ users, guests, form }) {
  return {
    invitedGuests: form.inviteGuests,
    users,
    guests
  };
}

export default connect(mapStateToProps, { fetchUsers })(InviteGuestsModal);
