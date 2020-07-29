import React from "react"
import { Link } from "gatsby"

import { Navbar, Nav, Form, FormControl, Button, Container } from "react-bootstrap"
import LoginButton from "../loginButton/loginButton"
import { useAuth0 } from "@auth0/auth0-react"
import ProfileIcon from "../profileIcon/profileIcon"
import "./_navbar.scss"

interface INavProps {
  pageName: string;
  user: any;
  isAuthenticated: boolean;
}

export default function CustomNavbar (props: INavProps) {
  const {pageName, user, isAuthenticated} = props;

  return (
    <>
      <Navbar variant="dark" expand="lg" id="site-navbar">
        <Container>
        <Link to="/" className="link-no-style">
          <Navbar.Brand as="span">Form App</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" activeKey={pageName}>
          </Nav>
        </Navbar.Collapse>
            <LoginButton isAuthenticated={isAuthenticated} />
            <ProfileIcon user={user} isAuthenticated={isAuthenticated} />
        </Container>
      </Navbar>
    </>
  )
}
