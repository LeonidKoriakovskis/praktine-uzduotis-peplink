import React from "react";
import { Link } from "react-router";
import './Navbar.css'; 

const Navbar: React.FC = () => {
  return (
     <nav className="navbar">
      <Link to="/">Vartotojai</Link>
      <Link to="/jokes">Juokeliai</Link>
    </nav>
  );
}

export default Navbar;