// src/Components/Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ loggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session data
    sessionStorage.removeItem('user');
    // Call parent component logout handler
    onLogout();
    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <Link className="navbar-brand" to="/">CRUD App</Link>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {!loggedIn && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}
          {loggedIn && (
            <>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li> */}
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
