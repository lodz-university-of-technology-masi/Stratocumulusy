
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import Recruiter from "./containers/Recruiter";
import CustomerMenager from "./containers/CustomerMenager";
import Client from "./containers/Client";

export default function Routes({ appProps }) {
    return (
      <Switch>
        <AppliedRoute path="/" exact component={Home} appProps={appProps} />
        <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
        <AppliedRoute path="/signup" exact component={Signup} appProps={appProps} />
        <AppliedRoute path="/recruiter" exact component={Recruiter} appProps={appProps} />
        <AppliedRoute path="/customerMenager" exact component={CustomerMenager} appProps={appProps} />
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
      </Switch>
    );
  }