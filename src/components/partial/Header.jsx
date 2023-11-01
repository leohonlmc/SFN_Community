import "../../Header.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="Header">
      <HelmetProvider>
        <Helmet>
          <title>{props.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
      </HelmetProvider>
      <div className="outer-header-div">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">
            <img
              src="https://scarboroughfoodnetwork.ca/wp-content/uploads/2023/04/sfn-logo-green-filled-300x300-1.png"
              alt=""
              style={{ width: "75px" }}
            />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div
              style={{
                width: "25px",
                height: "3px",
                backgroundColor: "black",
                marginBottom: "5px",
              }}
            ></div>
            <div
              style={{
                width: "25px",
                height: "3px",
                backgroundColor: "black",
                marginBottom: "5px",
              }}
            ></div>
            <div
              style={{ width: "25px", height: "3px", backgroundColor: "black" }}
            ></div>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>

              {localStorage.getItem("token") ? null : (
                <li className="nav-item active">
                  <a className="nav-link" href="/#/news">
                    News Feed
                  </a>
                </li>
              )}

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  More
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    About SFN Community
                  </a>
                  <a className="dropdown-item" href="#">
                    Contact
                  </a>
                </div>
              </li>
            </ul>
            <div className="d-flex">
              <Link to="/login" className="btn btn-outline-success me-2">
                Client Login
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
