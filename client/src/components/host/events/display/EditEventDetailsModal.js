import "./Modal.css";
import React from "react";
import TooltippedButton from "../../../TooltippedButton";
import Modal from "./Modal";

class EditEventDetailsModal extends React.Component {
  render() {
    return (
        <Modal onClose={this.props.onClose} show={this.props.show}>
           Edit Event Details Modal!
        </Modal>
    );
  }
}

export default EditEventDetailsModal;
