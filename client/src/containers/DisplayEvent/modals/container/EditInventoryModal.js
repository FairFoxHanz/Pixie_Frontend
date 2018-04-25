import React from "react";
import Modal from "../../../../components/Modal";

class EditInventoryModal extends React.Component {
  render() {
    return (
      <Modal
        modalTitle={"Edit Inventory"}
        onClose={this.props.onClose}
        show={this.props.show}
      >
        Edit Inventory Modal!
      </Modal>
    );
  }
}

export default EditInventoryModal;
