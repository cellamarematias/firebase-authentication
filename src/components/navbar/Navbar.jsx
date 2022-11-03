import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from '../../helper';
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const auth = getAuth();
  let navigate = useNavigate();


  const logout = () => {
    console.log('loggin out')
    signOut(auth).then(() => {
      navigate('/login')
    })
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="#">Firebase Auth</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <NavLink className="nav-link logged-out" end to="/">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link logged-out" to="/signup">SignUp</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link logged-in" to="#" onClick={logout}>Logout</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
};
