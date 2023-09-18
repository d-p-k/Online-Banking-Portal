import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Landing.css";
import { useAuth } from "../../Utility/AuthProvider";
import logo from "../img/logo.png";

function Navbar() {
  const auth = useAuth();
  return (
    !auth.jwt && (
      <div>
        <div className="container-fluid bg-light">
          <div className="row">
            <div className="col-10 mx-auto">
              <nav className="navbar navbar-expand-lg bg-transparent">
                <div className="container-fluid">
                  <NavLink className="navbar-brand" to="/">
                    <img src={logo} width="35" alt="" /> Apex Bank
                  </NavLink>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <NavLink
                          activeClassName="menu_active"
                          className="nav-link"
                          aria-current="page"
                          to="/"
                        >
                          Home
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/service">
                          Services
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/about">
                          About
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/contact">
                          Contact
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <div className="btn-group">
                          <Link className="nav-link" data-toggle="dropdown">
                            Login
                          </Link>
                          <ul className="dropdown-menu mt-2">
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/customer-register"
                              >
                                Customer Register
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/customer-login"
                              >
                                Customer Login
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/employee-login"
                              >
                                Employee Login
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/vendor-login"
                              >
                                Vendor Login
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/teamleader-login"
                              >
                                Team Leader Login
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" to="/admin-login">
                                Admin Login
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Navbar;
