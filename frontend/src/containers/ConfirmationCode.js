import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import React, {useState} from "react";
import {Auth} from "aws-amplify";
import "./ConfirmationCode.css";
import {useFormFields} from "../libs/hooksLib";

export default function ConfirmationCode(props) {

  return (
    <div className="ConfirmationCode">
      <div className="lander">
        <h3>Please contact Administrator to confirm your account</h3>

      </div>

    </div>
);



}

