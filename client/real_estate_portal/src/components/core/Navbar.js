import React from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from '../../assets/img/logo.png';

import '../../styles/Navbar.css';

function NavBar() {
  const apiHost = process.env.REACT_APP_API_HOST;
  const { token, logout } = useAuth();

  console.log('Token:', token); // Add this line to check the token

  const handleLogout = async () => {
    try {
      console.log('Token before logout:', token); // Add this line to check the token before logout

      const response = await axios.post(
        `${apiHost}/api/logout/`,
        {
          token: token,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        logout();
        console.log('Logout successful');
        window.location.href = '/login';
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary border-bottom border-light-subtle"
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src={Logo}
            alt="Arrived"
            width="80"
            height="40"
            className="d-inline-block align-top"
          />{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/properties">
              <strong>Invest</strong>
            </Nav.Link>
            <NavDropdown title={<strong>Learn</strong>} id="collapsible-nav-dropdown">
              {/* Dropdown items */}
            </NavDropdown>
            <NavDropdown title={<strong>About</strong>} id="collapsible-nav-dropdown">
              {/* Dropdown items */}
            </NavDropdown>
          </Nav>
          <Nav>
            {token ? (
              // User is logged in, show the logout button
              <Nav.Link href="#deets">
                <Button variant="light" onClick={handleLogout}>
                  Log out
                </Button>
              </Nav.Link>
            ) : (
              // User is not logged in, show the login and signup buttons
              <>
                <Nav.Link href="/login">
                  <Button variant="light">Log In</Button>
                </Nav.Link>
                <Nav.Link href="/register">
                  <Button variant="dark">Sign Up</Button>
                </Nav.Link>
              </>
            )} 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
