import React from 'react';
import { NavLink } from 'react-router-dom';

const views = ['Home', 'Campuses', 'Students']

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
          {views.map(view => {
            let path = view === 'Home' ? '/' : `/${view}`;
            return (
              <NavLink className="nav nav-pills" to={path}>
                <li key={view}>{view}</li>
              </NavLink>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
