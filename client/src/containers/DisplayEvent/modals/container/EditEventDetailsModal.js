import React from "react";
import Modal from "../../../../components/Modal";

class EditEventDetailsModal extends React.Component {
  render() {
    return (
      <Modal
        modalTitle={"Edit Event"}
        onClose={this.props.onClose}
        show={this.props.show}
      >
        Edit Event Details Modal!
      </Modal>
    );
  }
}

export default EditEventDetailsModal;
