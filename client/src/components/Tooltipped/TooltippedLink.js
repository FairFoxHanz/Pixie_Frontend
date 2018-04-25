import "react-tippy/dist/tippy.css";
import React from "react";
import { Tooltip } from "react-tippy";
import { Link } from "react-router-dom";

export default props => {
  const { title, className, icon, to } = props;
  return (
    <Tooltip
      followCursor
      theme="dark"
      title={title}
      position="top"
      trigger="mouseenter"
    >
      <Link className={className} to={to}>
        <i className="material-icons">{icon}</i>
      </Link>
    </Tooltip>
  );
};
