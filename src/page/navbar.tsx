import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { USER_TOKEN } from '../api/CONSTANTS';
import { signOutUser } from '../api/user/logOut';

function Navbar() {
  const userToken = localStorage.getItem(USER_TOKEN);
  const navigate = useNavigate();

  const handleSignOut = () => {
    const confirmed = window.confirm('Are you sure you want to sign out?');
    if (confirmed) {
      signOutUser()
        .then(() => {
          navigate('/login'); // Redirect to the login page after successful sign-out
        })
        .catch((error) => {
          console.log('Sign out error:', error);
          // Handle the error, show an error message, or perform any other necessary actions
        });
    }
  };

  if (!userToken) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/films">Films</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/films">Films</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleSignOut}>Sign Out</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
