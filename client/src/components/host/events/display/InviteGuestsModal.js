import "./Modal.css";
import React from "react";
import TooltippedButton from "../../../TooltippedButton";
import Modal from "./Modal";

class InviteGuestsModal extends React.Component {
  render() {
    return (
        <Modal modalTitle={"Invite Guests"} onClose={this.props.onClose} show={this.props.show}>
            Invite Guests Modal!
        </Modal>
    );
  }
}

export default InviteGuestsModal;
