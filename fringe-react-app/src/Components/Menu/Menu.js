import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';

function Menu() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Navbar bg="dark" variant="dark" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} id="navbarDropdown">Shows</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/shows">All Shows</Dropdown.Item>
                <Dropdown.Item as={Link} to="/shows/genre/Comedy">Comedy</Dropdown.Item>
                <Dropdown.Item as={Link} to="/shows/genre/Theatre">Theatre</Dropdown.Item>
                <Dropdown.Item as={Link} to="/shows/genre/Dance">Dance</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {
              isLoggedIn
              ? <Nav.Link as={Link} to="/users/id/:id">Your Profile</Nav.Link>
              : <Nav.Link as={Link} to="/login">Log In</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
