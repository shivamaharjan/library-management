import { signOut } from "firebase/auth";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import { setUserInfo } from "../../redux/auth/authSlice";
import { isStudent } from "../../utils";

function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUserInfo({}));
    });
  };
  return (
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand href="/">Library Management</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userInfo?.uid ? (
              <>
                {isStudent(userInfo) ? <Link to="/history" className="nav-link">
                  Dashboard
                </Link> : <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>}

                <Link to="/#" onClick={handleLogout} className="nav-link">
                  Sign Out
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
