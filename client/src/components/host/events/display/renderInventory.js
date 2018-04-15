import React from "react";
import Loader from "../../../Loader";

export default function renderInventory(inventory) {
  return (
    <div className="row">
      <div className="col s12 m12">
        <div className="card">
          <div className="card-content">
            <div className="card-title">Event inventory</div>
            {renderInventoryTable(inventory)}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderInventoryTable(inventory) {
  if (!inventory) {
    return (
      <div className="center">
        <Loader size="small"/>
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
