import React from "react";
import TooltippedButton from "../../../TooltippedButton";
import StateComponent from "../../../StateComponent";
import Loader from "../../../Loader";
import EditInventoryModal from "./EditInventoryModal";

class EventInventory extends StateComponent {
  render() {
    return (
      <div className="row">
        <div className="col s12 m12">
          <div
            className="card"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            {this.props.isUserAnOwner && (
              <TooltippedButton
                className="btn-floating btn-small waves-effect waves-light cyan right edit-button"
                icon="edit"
                title="Edit Inventory"
                onClick={this.toggleModal}
              />
            )}
            <EditInventoryModal
              show={this.state.isOpen}
              onClose={this.toggleModal}
            />
            <div className="card-content">
              <div className="card-title">Event inventory</div>
              {this.renderInventoryTable(this.props.inventory)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderInventoryTable(inventory) {
    if (!inventory) {
      return (
        <div className="center">
          <Loader size="small" />
        </div>
      );
    }
    if (inventory.length === 0) {
      return <p>No inventory added for this event</p>;
    } else {
      return (
        <table className="highlight">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => {
              return (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.amount}</td>
                  <td>{item.unit}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  }
}

export default EventInventory;