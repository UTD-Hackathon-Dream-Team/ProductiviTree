import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import "../NavBar.css";
import logo from "../assets/logo.png"

const linkStyle = { 
  textDecoration: "none", 
  margin: "1.8rem", 
  color: "#173780",
  fontWeight: 600 
}
const logoStyle = {
  margin: "1rem 3rem 1rem 3rem"
}

function NavBar() {
  return (
    <Navbar className="navBar" fixed="top" color="dark" expand="md" dark>
      <NavbarBrand href="/" style={logoStyle}><img src={logo} className="logo"/></NavbarBrand>
      <Nav className="tabs" navbar>
        <NavItem>
          <Link to="/about" style={linkStyle}>About Us</Link>
        </NavItem>
        <NavItem>
          <Link to="/feed" style={linkStyle}>Feed</Link>
        </NavItem>
        <NavItem>
          <Link to="/stats" style={linkStyle}>Statistics</Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
