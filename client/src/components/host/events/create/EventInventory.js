import React from "react";
import { Field, FieldArray } from "redux-form";
import { Tooltip } from "react-tippy";
import renderField from "./renderField";

const renderInventory = ({ fields, meta: { touched, error } }) => (
  <ul>
    {fields.map((item, index) => (
      <li key={index}>
        <h6>#{index + 1}</h6>
        <div className="row">
          <div className="col s6">
            <Field
              name={`${item}.name`}
              type="text"
              component={renderField}
              label="Name"
            />
          </div>
          <div className="col s3">
            <Field
              name={`${item}.amount`}
              type="text"
              component={renderField}
              label="Amount"
            />
          </div>
          <div className="col s2">
            <Field
              name={`${item}.unit`}
              type="text"
              component={renderField}
              label="Unit"
            />
          </div>
          <div className="col s1">
            <Tooltip
              followCursor
              theme="dark"
              title="Remove item"
              position="top"
              trigger="mouseenter"
            >
              <button
                className="btn-floating btn-small waves-effect waves-light pink accent-3 right"
                type="button"
                title="Remove item"
                onClick={() => fields.remove(index)}
              >
                <i className="material-icons">delete</i>
              </button>
            </Tooltip>
          </div>
        </div>
      </li>
    ))}
    <li>
      <Tooltip
        followCursor
        theme="dark"
        title="Add new item"
        position="top"
        trigger="mouseenter"
      >
        <button
          type="button"
          className="btn-floating btn-small waves-effect waves-light pink accent-3"
          onClick={() => fields.push({})}
        >
          <i className="material-icons">add_box</i>
        </button>
      </Tooltip>
    </li>
  </ul>
);

const InventoryList = props => {
  const { label } = props;
  return (
    <div>
      <label>{label}</label>
      <FieldArray name="inventory" component={renderInventory} />
    </div>
  );
};

export default InventoryList;
