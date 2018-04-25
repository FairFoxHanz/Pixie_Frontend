import React from "react";
import TooltippedButton from "../../../components/Tooltipped/TooltippedButton";

export default props => {
  if (props.inventory.length > 0) {
    return (
      <ul className="collection with-header col s6">
        <div className="collection-header">
          <h6>Will bring</h6>
        </div>

        {props.inventory.map(item => (
          <li key={item._id} className="collection-item row">
            <span className="col s10">{`${item.amount} ${item.unit} of ${
              item.name
            }`}</span>
            {props.isOwner ? (
              <TooltippedButton
                className="waves-effect waves-teal btn-flat btn-small col s2"
                title="Cancel item declaration"
                onClick={() => props.onCancelItem(item.name)}
                icon="close"
              />
            ) : null}
          </li>
        ))}
      </ul>
    );
  } else return null;
};
