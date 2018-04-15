import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import EventNew from "./host/events/create/EventNew";
import HostedEvents from "./host/HostedEvents";
import EventDisplay from "./host/events/display/EventDisplay";
import InvitationsList from "./guest/InvitationsList";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  addAuthorizedHostRoutes() {
    if (this.props.auth) {
      return [
        <Route key="host" exact path="/host" component={HostedEvents} />,
        <Route
          key="host-create"
          exact
          path="/host/create"
          component={EventNew}
        />, <Route
        key="host-display"
        path="/event/:eventId"
        component={EventDisplay}
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
