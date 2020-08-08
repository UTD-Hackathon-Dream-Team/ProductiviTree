import React from "react";
import { Link } from "react-router-dom";
import "../NavBar.css"

function NavBar() {
  return (
    <nav className="navBar">
      <Link to="" style={{margin: "auto 0 auto 1rem", textDecoration: "none"}}><h1>Productivitree</h1></Link>
      <ul className="tabs">
        <li>
          <Link to="/about" style={{textDecoration: "none", margin:"1rem"}}>About Us</Link>
        </li>
        <li>
          <Link to="/feed" style={{textDecoration: "none", margin:"1rem"}}>Feed</Link>
        </li>
        <li>
          <Link to="/stats" style={{textDecoration: "none", margin:"1rem"}}>Statistics</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
