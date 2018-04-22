import "./Modal.css";
import _ from "lodash";
import React from "react";
import { fetchUsers, inviteGuests } from "../../../../actions";
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
    const guestsIds = [];
    _.forIn(this.props.invitedGuests.values, (value, key) => {
      if (value.invited) guestsIds.push(key);
    });

    this.props.inviteGuests(this.props.displayedEvent._id, guestsIds);
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

function mapStateToProps({ users, guests, form, displayedEvent }) {
  return {
    invitedGuests: form.inviteGuests,
    displayedEvent,
    users,
    guests
  };
}

export default connect(mapStateToProps, { fetchUsers, inviteGuests })(
  InviteGuestsModal
);
