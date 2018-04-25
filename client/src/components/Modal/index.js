import "./style.css";
import React, { Component } from "react";
import TooltippedButton from "../Tooltipped/TooltippedButton";

class Modal extends Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="modal-backdrop">
        <div className="modal-window card">
          <div className="card-stacked">
            <div className="card-content">
              <span className="card-title">{this.props.modalTitle}</span>
              <div className="modal-content">{this.props.children}</div>
              <div className="card-action">
                <TooltippedButton
                  className="btn-floating btn-small waves-effect waves-light red left close-modal-button"
                  icon="close"
                  onClick={this.props.onClose}
                  title="Close"
                />
                <TooltippedButton
                  className="btn-floating btn-small waves-effect waves-light cyan right close-modal-button"
                  icon="done"
                  onClick={this.props.onAccept}
                  title="Submit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
