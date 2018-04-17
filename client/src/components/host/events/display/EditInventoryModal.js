import "./Modal.css";
import React from "react";
import TooltippedButton from "../../../TooltippedButton";
import Modal from "./Modal";

class EditInventoryModal extends React.Component {
  render() {
    return (
        <Modal onClose={this.props.onClose} show={this.props.show}>
           Edit Inventory Modal!
        </Modal>
    );
  }
}

export default EditInventoryModal;
