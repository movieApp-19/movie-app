import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import './Navbar.css';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const avatarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (
      sidebarRef.current && !sidebarRef.current.contains(event.target) &&
      avatarRef.current && !avatarRef.current.contains(event.target)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar-container">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            exact
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            to="/showtimes"
          >
            Showtimes
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            to="/search"
          >
            Search Movies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            to="#"
          >
            Favorites list
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            to="#"
          >
            Add here
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            to="#"
          >
            Add here
          </NavLink>
        </li>

        <li className="nav-item nav-right" onClick={toggleSidebar} ref={avatarRef}>
          <a className="nav-link">
            <BiUser size={40} color="#fff" />
          </a>
        </li>
      </ul>

      {isSidebarOpen && (
        <div className="sidebar" ref={sidebarRef}>
          <nav className="nav flex-column">
            <a className="nav-link" href="#">Login</a>
            <a className="nav-link" href="signup">Register</a>
            <a className="nav-link" href="#">Logout</a>
            <a className="nav-link" href="/delete-account">Delete Account</a>
          </nav>
        </div>
      )}
    </div>
  );
}
