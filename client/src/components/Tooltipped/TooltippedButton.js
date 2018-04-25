import "react-tippy/dist/tippy.css";
import React from "react";
import { Tooltip } from "react-tippy";

export default props => {
  const { onClick, title, className, icon } = props;
  return (
    <Tooltip
      followCursor
      theme="dark"
      title={title}
      position="top"
      trigger="mouseenter"
    >
      <button className={className} type="button" onClick={onClick}>
        <i className="material-icons">{icon}</i>
      </button>
    </Tooltip>
  );
};
