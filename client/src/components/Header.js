import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import keys from "../config/keys";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li key="login">
            <a href={`/auth/facebook/`}>
              Login with Facebook
            </a>
          </li>
        );
      default:
        return (
          <li key="logout">
            <a href={`/api/logout`}>Logout</a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="light-blue nav-wrapper">
          <Link to={this.props.auth ? "/" : "/"} className="left brand-logo">
            Pixy
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
