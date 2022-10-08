import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          CyberSoft
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 mt-lg-0">
            <li className="nav-item">
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link bg-warning" : "nav-link"
                }
                to="/form"
                style={({ isActive }) => (isActive ? { color: "red" } : {})}
              >
                FormStudent
              </NavLink>
            </li>
          </ul>
          <form className="d-flex my-2 my-lg-0">
          </form>
        </div>
      </nav>
    );
  }
}
