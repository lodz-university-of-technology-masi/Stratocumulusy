import React, { useState } from "react";
import {  FormGroup, FormControl, ControlLabel, HelpBlock, } from "react-bootstrap";
import "./Login.css";
import {Auth} from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import {useFormFields} from "../libs/hooksLib";

export default function Login(props) {
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmationCode: ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    try {
      let response = await Auth.signIn(fields.email, fields.password);

      let userType = response["signInUserSession"]['accessToken']['payload']['cognito:groups'][0];
      props.userHasAuthenticated(true);
      if(userType == "Recruiter"){
        props.history.push("/recruiter");
        props.userIsCandidate(false);
      }
      else if(userType == "Candidate"){
        props.history.push("/candidate");
        props.userIsCandidate(true);
      }
      
    } catch (e) { // lapie tu ze nie jest potwierdzony klient

      props.history.push("/confirmationCode");
      setIsLoading(false);
    }
  }


  return (
      <div className="Login">
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
                autoFocus
                type="email"
                value={fields.email}
                onChange={handleFieldChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
                value={fields.value}
                onChange={handleFieldChange}
                type="password"
            />
          </FormGroup>
          <LoaderButton block bsSize="large" isLoading={isLoading} disabled={!validateForm()} type="submit">
            Login
          </LoaderButton>
        </form>
      </div>
  );







}