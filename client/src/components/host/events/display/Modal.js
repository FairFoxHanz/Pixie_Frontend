import "./Modal.css";
import React, { Component } from "react";
import TooltippedButton from "../../../TooltippedButton";

class Modal extends Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modal-backdrop">
        <div className="modal-window card">
          <div className="card-content">{this.props.children}</div>
          <div className="card-action">
            <TooltippedButton
              className="btn-floating btn-small waves-effect waves-light red left close-modal-button"
              icon="close"
              onClick={this.props.onClose}
              title="Close"
            />{" "}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
