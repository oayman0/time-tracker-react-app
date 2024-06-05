import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
// import { HashLink } from 'react-router-hash-link';

const LandingNavBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  return (
    <>
      <Navbar key='lg' expand='lg'>
        <Container fluid>
          <Navbar.Brand>
            <Link to='/'>
              <img
                src={logo}
                height='40'
                className='d-inline-block align-top'
                alt='Little Lemon logo'
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-lg`}
            onClick={() => setShow(!show)}
          />
          <Navbar.Offcanvas
            show={show}
            onHide={handleClose}
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement='end'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Time Tracker
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='ms-auto'>
                <Link to='/' className='nav-link' onClick={handleClose}>
                  Features
                </Link>
                <Link
                  to='/'
                  smooth
                  className='nav-link'
                  onClick={handleClose}
                >
                  Contact Us
                </Link>
                <Link
                  to='/'
                  smooth
                  className='nav-link'
                  onClick={handleClose}
                >
                  Sign Up
                </Link>
                <Link
                  to='/'
                  className='nav-link'
                  onClick={handleClose}
                >
                  Login
                </Link>
               </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default LandingNavBar;
