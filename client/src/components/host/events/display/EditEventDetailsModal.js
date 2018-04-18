import "./Modal.css";
import React from "react";
import Modal from "./Modal";

class EditEventDetailsModal extends React.Component {
  render() {
    return (
        <Modal modalTitle={"Edit Event"} onClose={this.props.onClose} show={this.props.show}>
           Edit Event Details Modal!
        </Modal>
    );
  }
}

export default EditEventDetailsModal;
