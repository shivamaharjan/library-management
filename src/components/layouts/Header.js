import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <Navbar expand="lg" variant="dark" bg="dark">
    <Container>
      <Navbar.Brand href="/">Library Management</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
         
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/sign-up" className="nav-link">
                  Sign Up
                </Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header