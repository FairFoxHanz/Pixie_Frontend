import "./style.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li key="login">
            <a href={`/auth/facebook/`} className="header-button login-button">
              Facebook Login
            </a>
          </li>
        );
      default:
        return (
          <li key="logout">
            <a href={`/auth/logout`} className="header-button">
              Logout
            </a>
          </li>
        );
    }
  }

  renderOptions() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return;
      default:
        return (
          <ul className="right">
            <li key="guest">
              <Link to={`/guest/`} className="header-button">
                Guest
              </Link>
            </li>
            <li key="host">
              <Link to={`/host/`} className="header-button">
                Host
              </Link>
            </li>{" "}
          </ul>
        );
    }
  }

  render() {
    return (
      <nav className="navigation">
        <div className="white nav-wrapper">
          <ul className="left">{this.renderContent()}</ul>

          <Link to={this.props.auth ? "/" : "/"} className="brand-logo center">
            <img className="logo-img" src="/logo.png" alt="logo" />
          </Link>
          {this.renderOptions()}
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
