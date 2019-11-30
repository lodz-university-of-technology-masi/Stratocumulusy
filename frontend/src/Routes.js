
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Recruiter from "./containers/Recruiter";
import CustomerMenager from "./containers/CustomerMenager";
import Candidate from "./containers/Candidate";
import TestList from "./containers/TestList";
import Results from "./containers/Results";
import SolveTest from "./containers/SolveTest";
import AddCandidate from "./containers/AddCandidate";
import ConfirmationCode from "./containers/ConfirmationCode";

export default function Routes({ appProps }) {
    return (
      <Switch>
        <AppliedRoute path="/" exact component={Home} appProps={appProps} />
        <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
        <AppliedRoute path="/recruiter" exact component={Recruiter} appProps={appProps} />
        <AppliedRoute path="/candidate" exact component={Candidate} appProps={appProps} />
        <AppliedRoute path="/tests" exact component={TestList} appProps={appProps} />
        <AppliedRoute path="/solvetest" exact component={SolveTest} appProps={appProps} />
        <AppliedRoute path="/results" exact component={Results} appProps={appProps} />
        <AppliedRoute path="/customerMenager" exact component={CustomerMenager} appProps={appProps} />
        <AppliedRoute path="/addCandidate" exact component={AddCandidate} appProps={appProps} />
        <AppliedRoute path="/confirmationCode" exact component={ConfirmationCode} appProps={appProps} />
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
      </Switch>
    );
  }