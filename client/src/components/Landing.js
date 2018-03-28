import React from "react";
import { connect } from "react-redux";

const Landing = props => {
  let name = "";
  if (props.auth) {
    name = props.auth.name || "";
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        {name ? `${name} welcome on` : ""}
        <br />
        Pixy!
      </h1>
      Organize you event easily!
    </div>
  );
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Landing);
