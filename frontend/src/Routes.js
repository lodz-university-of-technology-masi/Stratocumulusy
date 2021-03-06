
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import AddTest from "./containers/AddTest";
import CustomerMenager from "./containers/CustomerMenager";
import Candidate from "./containers/Candidate";
import Recruiter from "./containers/Recruiter";
import TestList from "./containers/TestList";
import Results from "./containers/Results";
import SolveTest from "./containers/SolveTest";
import EditTest from "./containers/EditTest";
import AddCandidate from "./containers/AddCandidate";
import ConfirmationCode from "./containers/ConfirmationCode";
import AddTestToCandidate from "./containers/AddTestsToCandidate";
import CandidateList from "./containers/CandidatesList";
import TestToCheck from "./containers/TestToCheck";
import CheckSelectedTest from "./containers/CheckSelectedTest";

export default function Routes({ appProps }) {
    return (
      <Switch>
        <AppliedRoute path="/" exact component={Home} appProps={appProps} />
        <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
        <AppliedRoute path="/addTest" exact component={AddTest} appProps={appProps} />
        <AppliedRoute path="/candidate" exact component={Candidate} appProps={appProps} />
        <AppliedRoute path="/recruiter" exact component={Recruiter} appProps={appProps} />
        <AppliedRoute path="/tests" exact component={TestList} appProps={appProps} />
        <AppliedRoute path="/solvetest" exact component={SolveTest} appProps={appProps} />
        <AppliedRoute path="/edittest" exact component={EditTest} appProps={appProps} />
        <AppliedRoute path="/results" exact component={Results} appProps={appProps} />
        <AppliedRoute path="/customerMenager" exact component={CustomerMenager} appProps={appProps} />
        <AppliedRoute path="/addCandidate" exact component={AddCandidate} appProps={appProps} />
        <AppliedRoute path="/confirmationCode" exact component={ConfirmationCode} appProps={appProps} />
          <AppliedRoute path="/addTestToCandidate" exact component={AddTestToCandidate} appProps={appProps} />
          <AppliedRoute path="/candidateList" exact component={CandidateList} appProps={appProps} />
          <AppliedRoute path="/testToCheck" exact component={TestToCheck} appProps={appProps} />
          <AppliedRoute path="/checkSelectedTest" exact component={CheckSelectedTest} appProps={appProps} />
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
      </Switch>
    );
  }