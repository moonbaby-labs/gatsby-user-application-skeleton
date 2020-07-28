import React from "react"
import { Link } from "gatsby"

import { Navbar, Nav, Container } from "react-bootstrap"

const CustomNavbar = ({ pageInfo }) => {
  return (
    <>
      <Navbar variant="dark" expand="lg" id="site-navbar">
        <Container>
        <Link to="/" className="link-no-style">
          <Navbar.Brand as="span">Form App</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" activeKey={pageInfo && pageInfo.pageName}>
            <Link to="/login" className="link-no-style">
              <Nav.Link as="span" eventKey="login">
                Login
              </Nav.Link>
            </Link>
            <Link to="/register" className="link-no-style">
              <Nav.Link as="span" eventKey="register">
                Register
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default CustomNavbar
