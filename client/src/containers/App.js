import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header/";
import Landing from "./Landing/";
import CreateEvent from "./CreateEvent/";
import HostedEventsList from "./HostedEventsList";
import DisplayEvent from "./DisplayEvent";
import InvitationsList from "./InvitationsList";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  addAuthorizedHostRoutes() {
    if (this.props.auth) {
      return [
        <Route key="host" exact path="/host" component={HostedEventsList} />,
        <Route
          key="host-create"
          exact
          path="/host/create"
          component={CreateEvent}
        />,
        <Route
          key="host-display"
          path="/event/:eventId"
          component={DisplayEvent}
        />
      ];
    }
  }

  addAuthorizedGuestRoutes() {
    if (this.props.auth) {
      return [
        <Route key="guest" exact path="/guest" component={InvitationsList} />
      ];
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="top-bar" />
          <Header />
          <Route exact path="/" component={Landing} />
          {this.addAuthorizedHostRoutes()}
          {this.addAuthorizedGuestRoutes()}
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(App);
