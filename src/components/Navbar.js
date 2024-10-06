import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <a href="/" className="logo">
        MyApp
      </a>
      <div className={`navbar-links ${isOpen ? "active" : ""}`}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/users">Users</a>
        <a href="/contact">Contact</a>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
