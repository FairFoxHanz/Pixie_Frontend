import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";
import EventNew from "./host/events/EventNew";
import HostedEvents from "./host/HostedEvents";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  addAuthorizedRoutes() {
    if (this.props.auth) {
      return [
        <Route key="host" exact path="/host" component={HostedEvents} />,
        <Route key="host-create" exact path="/host/create" component={EventNew} />
      ];
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="top-bar" />
          <Header />
          <a href="fb-messenger://share/?link= https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fsharing%2Freference%2Fsend-dialog&app_id=356831484832247">Send In Messenger</a>


          <Route exact path="/" component={Landing} />
          {this.addAuthorizedRoutes()}
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(App);
