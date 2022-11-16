import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Routes, NavLink } from 'react-router-dom';
import React, { useEffect, useState } from "react";

const Header = () => {
  const [isToken, checkToken] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkToken(true);
    }
  })
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <NavLink to="/" className="nav-link me-3">Blog</NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll >
            {checkToken &&
              <NavLink to="/all-post" className="nav-link">All Post</NavLink>
            }
          </Nav>
          <Nav className="me-2" style={{ maxHeight: "100px" }} navbarScroll>
            {checkToken == false ?
              <div>
                <Link to='/login' className='btn btn-success link-class me-2'>Login</Link>
                <Link to='/signin' className='btn btn-warning link-class'>Singin</Link>
              </div>
              :
              <Link to="/logout" className="btn btn-danger link-class">Logout</Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
