import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar fixed-top navbar-dark bg-dark navbar-style">
          <a className="navbar-brand" >
            ESTO Library
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
                <Link to="/profile" className="nav-link">
                  my profile
                </Link>
              </li>


              <li className="nav-item">
                <Link to="/notifications" className="nav-link">
                  notifications
                </Link>
              </li>

              
              <li className="nav-item">
                <Link to="/cart" className="nav-link">
                  My Cart
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;