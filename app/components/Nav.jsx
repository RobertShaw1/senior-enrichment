import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="navbar navbar-default">
      <NavLink to="/">
        <span className="navbar-brand" >
          Margaret Hamilton Academy
        </span>
      </NavLink>
      <div>
        <ul className="nav nav-pills">
          <NavLink className="nav nav-pills" to="/">
            <li key="Home" className="navBarList"><span>Home</span></li>
          </NavLink>
          
          <NavLink className="nav nav-pills" to="/Campuses">
            <li key="Campuses" className="navBarList"><span>Campuses</span></li>
          </NavLink>
          
          <NavLink className="nav nav-pills" to="/Students">
            <li key="Students" className="navBarList"><span>Students</span></li>
          </NavLink>
        </ul>
      </div>
    </nav>
  )
}
