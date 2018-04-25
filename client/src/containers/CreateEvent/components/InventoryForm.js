import React from "react";
import { Field, FieldArray } from "redux-form";
import TooltippedButton from "../../../components/Tooltipped/TooltippedButton";
import FormField from "./FormField";

const renderInventory = ({ fields, meta: { touched, error } }) => (
  <ul>
    {fields.length > 0 ? renderLabels() : ""}
    {fields.map((item, index) => (
      <li key={index}>
        <div className="row">
          <div className="col s6">
            <Field name={`${item}.name`} type="text" component={FormField} />
          </div>
          <div className="col s3">
            <Field
              name={`${item}.amount`}
              type="number"
              component={FormField}
            />
          </div>
          <div className="col s2">
            <Field name={`${item}.unit`} type="text" component={FormField} />
          </div>
          <div className="col s1">
            <TooltippedButton
              className="btn-floating btn-small waves-effect waves-light pink accent-3 right"
              onClick={() => fields.remove(index)}
              title="Remove item"
              icon="delete"
            />
          </div>
        </div>
      </li>
    ))}
    <li>
      <TooltippedButton
        title="Add new item"
        onClick={() => fields.push({})}
        className="btn-floating btn-small waves-effect waves-light pink accent-3"
        icon="add_box"
      />
    </li>
  </ul>
);

const renderLabels = () => {
  return (
    <li className="row">
      <label className="col s6">Name</label>
      <label className="col s3">Amount</label>
      <label className="col s2">Unit</label>
    </li>
  );
};

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
