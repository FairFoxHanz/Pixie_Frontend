import React from "react";
import Loader from "../../../Loader";

export default function renderGuests(guests) {
  return (
    <div className="row">
      <div className="col s12 m12">
        <div className="card">
          <div className="card-content">
            <div className="card-title">Guests</div>
            {renderGuestsTable(guests)}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderGuestsTable(guests) {
  if (!guests) {
    return (
      <div className="center">
        <Loader size="small" />
      </div>
    );
  }
  if (guests.length === 0) {
    return <p>No guests are invited yet</p>;
  } else {
    return (
      <table className="highlight">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {guests.map(guest => {
            return (
              <tr key={guest.id}>
                <td>{guest.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
