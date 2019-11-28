import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import React, {useState} from "react";
import {Auth} from "aws-amplify";
import "./ConfirmationCode.css";
import {useFormFields} from "../libs/hooksLib";

export default function ConfirmationCode(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        confirmationCode: ""
    });

    function validateConfirmationForm() {
        return fields.email.length > 0 && fields.confirmationCode.length > 0;
    }
    async function handleConfirmationSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode);

            alert("Konto zostało potwierdzone. Mozesz się zalogować ( ͡° ͜ʖ ͡°)")
            props.history.push("/login");
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }


    return (

      <form onSubmit={handleConfirmationSubmit}>
           <h1>Potwierdź konto</h1>
          <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                  autoFocus
                  type="email"
                  value={fields.email}
                  onChange={handleFieldChange}
              />
          </FormGroup>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Confirm Account
        </LoaderButton>
      </form>
    );



}

