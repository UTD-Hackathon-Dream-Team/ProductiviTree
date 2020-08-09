import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import "../NavBar.css"

function NavBar() {
  return (
    <Navbar className="navBar" fixed="top" color="dark" expand="md" dark>
      <NavbarBrand href="/"  style={{ textDecoration: "none", margin:"1rem"}}><h1>Productivitree</h1></NavbarBrand>
      <Nav className="tabs" navbar>
        <NavItem>
          <Link to="/about" style={{ textDecoration: "none", margin: "1rem" }}>About Us</Link>
        </NavItem>
        <NavItem>
          <Link to="/feed" style={{ textDecoration: "none", margin: "1rem" }}>Feed</Link>
        </NavItem>
        <NavItem>
          <Link to="/stats" style={{ textDecoration: "none", margin: "1rem" }}>Statistics</Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
