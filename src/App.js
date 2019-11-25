import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {Navbar, Nav, NavItem, NavDropdown, DropdownButton} from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import {LinkContainer} from "react-router-bootstrap";
import {Auth} from 'aws-amplify';

function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }

 async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
  }
  
  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Stratocumulusy Testing Application</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse >
        </Navbar.Collapse >
        <Nav pullLeft>
          {isAuthenticated & true ? //jestem rekruterem
              <>
                <DropdownButton id="dropdown-basic-button" title="Tests">
                  <LinkContainer to={"/customerMenager"}>
                    <NavItem>List tests</NavItem>
                  </LinkContainer>
                  <LinkContainer to={"/recruiter"}>
                    <NavItem>Add test</NavItem>
                  </LinkContainer>
                  <LinkContainer to={"/customerMenager"}>
                    <NavItem>Import test</NavItem>
                  </LinkContainer>
                  <LinkContainer to={"/customerMenager"}>
                    <NavItem>Test to check</NavItem>
                  </LinkContainer>
                </DropdownButton>
                <DropdownButton id="dropdown-basic-button" title="Candidate">
                  <LinkContainer to={"/customerMenager"}>
                    <NavItem>Add candidate</NavItem>
                  </LinkContainer>
                  <LinkContainer to={"/recruiter"}>
                    <NavItem>List candidate</NavItem>
                  </LinkContainer>
                </DropdownButton>
              </>
              : null
          }
          {isAuthenticated & false ? // nie jestem kandydatem
              <>
                    <LinkContainer to={"/client"}>
                      <NavItem>Client</NavItem>
                    </LinkContainer>
              </>
              : null
          }
        </Nav>
        <Navbar.Collapse>
          <Nav pullRight>
          {isAuthenticated
  ? <NavItem onClick={handleLogout}>Logout</NavItem>
  : <>
      <LinkContainer to="/signup">
        <NavItem>Sing up</NavItem>
      </LinkContainer>
      <LinkContainer to="/login">
        <NavItem>Log in</NavItem>
      </LinkContainer>
    </>
}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{isAuthenticated,userHasAuthenticated}}/>
    </div>
  );
}

export default App;