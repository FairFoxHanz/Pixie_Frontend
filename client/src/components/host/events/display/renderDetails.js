import React from "react";

export default function renderDetails(event) {
  return (
    <div className="row">
      <div className="col s12 m12">
        <div className="card">
          <div className="card-content">
            <div className="card-title">Event Details</div>
            <ul class="collection">
              <li class="collection-item">Place: <p className="right">{event.place}</p></li>
              <li class="collection-item">Date: <p className="right">{event.eventDate}</p></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
