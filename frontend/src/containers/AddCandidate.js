import React, {useState} from "react";
import "./Candidate.css";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import {Auth} from "aws-amplify";
import {useFormFields} from "../libs/hooksLib";

export default function AddCandidate() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
      //  confirmationCode: ""
    });


    const [isLoading, setIsLoading] = useState(false);
    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    // function validateConfirmationForm() {
    //     return fields.confirmationCode.length > 0;
    // }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);
        

        try {
            const newUser = fetch('https://nbbmfshcof.execute-api.us-east-1.amazonaws.com/test/candidate', {
                dataType: "json",
                method: 'POST',
                body: JSON.stringify(
                    {
                    "user": fields.email,
                    "password":  fields.password
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }});
            setIsLoading(false);
            alert("Konto zostało dodane ᕙ(⇀‸↼‶)ᕗ")
        } catch (e) {
            alert(e.message);
            setIsLoading(false);
        }
    }


        return (
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
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        type="password"
                        onChange={handleFieldChange}
                        value={fields.confirmPassword}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Signup
                </LoaderButton>
            </form>
        );


}