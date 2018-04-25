import React from "react";

export default ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} type={type} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};