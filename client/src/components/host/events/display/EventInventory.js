import React from "react";
import TooltippedButton from "../../../TooltippedButton";
import StateComponent from "../../../StateComponent";
import Loader from "../../../Loader";
import { connect } from "react-redux";
import { provideItem } from "../../../../actions";
import EditInventoryModal from "./EditInventoryModal";

class EventInventory extends StateComponent {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

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
        <ul className="highlight">
          <li className="row">
            <label className="col s5">Name</label>
            <label className="col s3">Amount</label>
            <label className="col s2">Unit</label>
            <label className="col s1">Declare</label>
          </li>
          {inventory.map((item, index) => {
            return (
              <li key={index}>
                <div className="row">
                  <div className="col s5">{item.name}</div>
                  <div className="col s3">{item.amount}</div>
                  <div className="col s2">{item.unit}</div>
                  <div className="col s1">
                    <input
                      name={item.name}
                      type="text"
                      onChange={this.handleInputChange}
                    />
                    <button
                      onClick={() => {
                        const inventoryToProvide = {
                          name: item.name,
                          unit: item.unit,
                          amount: this.state[item.name]
                        };
                        this.props.provideItem(
                          this.props.displayedEvent._id,
                          inventoryToProvide
                        );
                      }}
                    >
                      Declare
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      );
    }
  }
}

function mapStateToProps({ displayedEvent }) {
  return {
    displayedEvent
  };
}

export default connect(mapStateToProps, { provideItem })(EventInventory);
