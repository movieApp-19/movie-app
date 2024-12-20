import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { useUser } from "../context/useUser.js";
import './Navbar.css';

export default function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);      // Sidebar
    const [isOpen, setIsOpen] = useState(false);            // Hamburger menu
    const sidebarRef = useRef(null);
    const avatarRef = useRef(null);
    const { signOut, isSignedIn } = useUser();

    const toggleSidebar = () => {
        console.log("avatar clicked! ")
        console.log("isSidebar: ", isSidebarOpen)
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleHamburgerMenu = () => {
        setIsOpen(!isOpen);
    }

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
            <div className="hamburgerMenu" onClick={toggleHamburgerMenu}>
                ☰
            </div>

            <ul className={`nav nav-tabs ${isOpen ? 'nav-open' : ''}`}>
                <li className="nav-item">
                    <NavLink
                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
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
                {isSignedIn() 
                ?
                <li className="nav-item">
                    <NavLink
                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                        to="/profile"
                    >
                        Profile
                    </NavLink>
                </li>
                : 
                null
                }
                <li className="nav-item">
                    <NavLink
                        className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                        to="/fanpage"
                    >
                        Fanpage
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
                        {!isSignedIn() ? <>
                            <a className="nav-link" href="/signin">Login</a>
                            <a className="nav-link" href="/signup">Register</a>
                        </> : <>
                            <a className="nav-link" href="/" onClick={signOut}>Logout</a>
                            <a className="nav-link" href="/delete-account">Delete Account</a>
                        </>}
                    </nav>
                </div>
            )}
        </div>
    );
}
