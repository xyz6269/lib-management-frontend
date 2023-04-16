import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminNav extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar fixed-top navbar-dark bg-dark navbar-style">
          <a className="navbar-brand" >
            ESTO Library Management
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/adminprofile" className="nav-link">
                  my profile
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/ordertracking" className="nav-link">
                  valid orders
                </Link>
              </li>


              <li className="nav-item">
                <Link to="/ordersmanagement" className="nav-link">
                  submitions
                </Link>
              </li>

              
              <li className="nav-item">
                <Link to="/users" className="nav-link">
                  users
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/bookwizard" className="nav-link">
                  add new book
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default AdminNav;