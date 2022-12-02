import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Routes, NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";

const Header = () => {
  const [isToken, checkToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkToken(true);
      // alert("ii")
    }
  })

  const logout = () => {
    // alert("Logout");
    localStorage.removeItem("token");
    checkToken(false);
    navigate("/login");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <NavLink to="/" className="nav-link me-3">Blog</NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll >
            {isToken &&
              <NavLink to="/all-post" className="nav-link">All Post</NavLink>
            }
          </Nav>
          <Nav className="me-2" style={{ maxHeight: "100px" }} navbarScroll>
            {isToken === true ?
              <button onClick={() => logout()} className="btn btn-danger">Logout</button>
              :
              <div>
                <Link to='/login' className='btn btn-success link-class me-2'>Login</Link>
                <Link to='/signin' className='btn btn-warning link-class'>Singin</Link>
              </div>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
